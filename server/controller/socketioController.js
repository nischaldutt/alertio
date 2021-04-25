const alertHandler = require("../services/alertHandler");
const adminHandler = require("../services/adminHandler");
const CONSTANTS = require("../properties/constants");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Socket.io connection established.");

    socket.on("customer-connected", async ({ values, branchIds }) => {
      const timestamp = new Date();
      const alertObj = {
        user_name: values.customer_username,
        pin_code_searched: values.pin_code,
      };

      const { affectedRows, insertId } = await alertHandler.saveAlerts({
        alertObj,
        timestamp,
        branchIds,
      });

      // get alert_ids at which the alerts were pushed in the database
      const alertIds = [];
      for (let id = 0; id < affectedRows; id++) {
        alertIds.push({ alert_id: insertId + id, branch_id: branchIds[id] });
      }
      console.log({ alert_ids: alertIds });

      // get online room names
      const connectedSocketIds = [];
      for (const [key, value] of io.sockets.adapter.rooms.entries()) {
        connectedSocketIds.push(key.toString());
      }
      console.log({ sockets_online: connectedSocketIds });

      // get branch name to which the alerts were sent
      const branchUsernames = await alertHandler.getBranchUsernames({
        branchIds,
      });
      console.log({ alerts_sent_to_branches: branchUsernames });

      // filter thr online rooms from all connected sockets
      const branchesOnline = connectedSocketIds.map((connectedSocket) => {
        return branchUsernames.filter(
          (branch) => connectedSocket === branch.username
        );
      });
      console.log({ rooms_online: branchesOnline.flat(1) });

      // emit realtime alerts to those rooms which are online
      alertIds.map((obj) => {
        branchesOnline.flat(1).map((branch) => {
          if (obj.branch_id === branch.branch_id) {
            console.log("real-time alerts sent to => ");
            console.log({
              branch_id: branch.branch_id,
              room: branch.username,
            });
            io.to(branch.username).emit("fetch-alerts-realtime", {
              alert_id: obj.alert_id,
              alert: JSON.stringify(alertObj),
              timestamp: timestamp,
            });
          }
        });
      });
    });

    socket.on("admin-connected", async ({ username }) => {
      console.log("admin connected to room ==> " + username);
      socket.join(username);
      const { branch_id } = await adminHandler.getBranchId({ username });
      const alerts = await alertHandler.fetchAlerts({ branch_id });
      io.to(username).emit("fetch-alerts", alerts);
    });
  });
};
