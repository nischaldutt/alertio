const alertHandler = require("../services/alertHandler");
const adminHandler = require("../services/adminHandler");
const CONSTANTS = require("../properties/constants");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Socket.io connection established.");

    socket.on("customer-connected", async ({ values, branchIds }) => {
      const alertObj = {
        user_name: values.customer_username,
        pin_code_searched: values.pin_code,
      };

      const response = await alertHandler.saveAlerts(alertObj, branchIds);

      // TODO:
      // 1. get all connected admin socket rooms
      // 2. get all branch ids from branches table where username = room name
      // 3. emit new alerts in those rooms only

      const connectedSocketIds = [];
      for (const [key, value] of io.sockets.adapter.rooms.entries()) {
        connectedSocketIds.push(key.toString());
      }
      console.log(connectedSocketIds);

      io.emit("fetch-alerts-realtime", alertObj);
    });

    socket.on("admin-connected", async ({ username }) => {
      console.log("connected admin!");
      socket.join(username);
      const { branch_id } = await adminHandler.getBranchId({ username });
      const alerts = await alertHandler.fetchAlerts({ branch_id });
      // socket.to(username).emit("fetch-alerts", alerts);
      io.emit("fetch-alerts", alerts);
      // io.to(socket.id).emit("fetch-alerts", alerts);
    });
  });
};
