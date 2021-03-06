import React from "react";
import { connect } from "react-redux";

import socket from "../../socketClient";
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
    minWidth: 100,
    align: "left",
  },
  {
    id: "contacts",
    label: "Contact Numbers",
    minWidth: 170,
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "80vh",
    width: "100vw",
  },
}));

const BranchTable = ({ branches, room }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // create a socket room with roomName = adminId
  React.useEffect(() => {
    if (branches.length) {
      socket.emit("admin-connected", {
        username: room,
      });
    }
  }, [branches, room]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderTableBody = () => {
    return branches
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((branch) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={branch.branch_id}>
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
      });
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
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
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
  room: state.room,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
