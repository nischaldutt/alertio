import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

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
  { id: "branch_address", label: "Branch Address", minWidth: 100 },
  { id: "institute_name", label: "Institute", minWidth: 100 },
  { id: "branch_incharge_name", label: "Branch Incharge", minWidth: 100 },
  { id: "city_name", label: "City", minWidth: 100 },
  {
    id: "username",
    label: "Username",
    minWidth: 170,
    align: "right",
  },
  {
    id: "password",
    label: "Password",
    minWidth: 170,
    align: "right",
  },
  {
    id: "contacts",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (contacts) => contacts.join(),
  },
  {
    id: "pin_codes",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (pin_codes) => pin_codes.join(),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const AdminDashboard = ({ branches }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log("here");
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
                  style={{ minWidth: column.minWidth }}
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
                          {column.format && typeof value === "number"
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
        rowsPerPageOptions={[10, 25, 100]}
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
