import React from "react";
import { connect } from "react-redux";

import socket from "../../socketClient";

import Loading from "../Loading";
import {
  Paper,
  Typography,
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
];

const useStyles = makeStyles({
  root: {},
  container: {},
  header: {
    padding: "20px",
  },
});

const SearchedBranchesTable = ({ branchInfo }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return !branchInfo.length ? (
    <Loading />
  ) : (
    <div>
      <Typography className={classes.header} variant="h4" align="center">
        Branches serving at this pin code.
      </Typography>
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
              {branchInfo
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
          count={branchInfo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  branchInfo: state.branchInfo,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedBranchesTable);