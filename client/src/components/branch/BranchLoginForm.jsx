import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";

import socket from "../../socketClient";
import { fetchAllBranches } from "../../actions";

import { TextField } from "mui-rff";

import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
} from "@material-ui/core";

const validate = (values) => {
  const errors = {};
  if (!values.branch_username) {
    errors.branch_username = "Required";
  }
  if (!values.branch_password) {
    errors.branch_password = "Required";
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        type="name"
        label="Enter branch username"
        name="branch_username"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="password"
        label="Enter password"
        name="branch_password"
        margin="none"
        required={true}
      />
    ),
  },
];

let username;

const BranchLoginForm = ({ fetchAllBranches }) => {
  // useEffect(() => {
  //   if (branches.length) {
  //     socket.emit("admin-connected", { username });
  //   }
  // }, [branches]);

  const onSubmit = (values) => {
    fetchAllBranches(values);
    // fetchAllBranches(values);
    // username = values.branch_username;
  };

  return (
    <Paper elevation={3}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Typography
                variant="h4"
                align="center"
                component="h4"
                gutterBottom
              >
                Enter Branch Credentials
              </Typography>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  fetchAllBranches,
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchLoginForm);
