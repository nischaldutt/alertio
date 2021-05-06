import React from "react";
import { connect } from "react-redux";

import socket from "../../socketClient";
import {
  checkIfAdminLoggedIn,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
} from "../../actions";

import Loading from "../Loading";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const columns = [
  { id: "branch_name", label: "Branch Name", minWidth: 170 },
  { id: "branch_address", label: "Branch Address", minWidth: 200 },
  { id: "institute_name", label: "Institute", minWidth: 100 },
  { id: "branch_incharge_name", label: "Branch Incharge", minWidth: 100 },
  { id: "city_name", label: "City", minWidth: 100 },
  {
    id: "username",
    label: "Username",
    minWidth: 170,
    align: "left",
  },
  {
    id: "password",
    label: "Password",
    minWidth: 170,
    align: "left",
  },
  {
    id: "contacts",
    label: "Contact Numbers",
    minWidth: 270,
    align: "left",
    format: (contacts) => contacts.join(", "),
  },
  {
    id: "pin_codes",
    label: "Pin Codes",
    minWidth: 170,
    align: "left",
    format: (pin_codes) => pin_codes.join(", "),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 70px)",
  },
  container: {
    maxHeight: "80vh",
  },
});

const BranchTable = ({
  branches,
  admin,
  room,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
  checkIfAdminLoggedIn,
  loggedIn,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // create a socket room with roomName = adminId
  React.useEffect(() => {
    if (branches.length) {
      socket.emit("admin-connected", { username: room });
    }
  }, [branches, room]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return !branches.length ? (
    <Loading />
  ) : (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {branches
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((branch) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={branch.branch_id}
                  >
                    {columns.map((column) => {
                      const value = branch[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "object"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={branches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  branches: state.branches,
  loggedIn: state.loggedIn,
  admin: state.admin,
  room: state.room,
});

const mapDispatchToProps = {
  checkIfAdminLoggedIn,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
