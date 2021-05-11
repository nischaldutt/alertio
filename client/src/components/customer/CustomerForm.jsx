import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";

import socket from "../../socketClient";
import { fetchBranchInfo, saveCustomer } from "../../actions";

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
  if (!values.customer_username) {
    errors.customer_username = "Required";
  }
  if (!values.pin_code) {
    errors.pin_code = "Required";
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        type="text"
        label="Name"
        name="customer_username"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="text"
        label="Pin code"
        name="pin_code"
        margin="none"
        required={true}
      />
    ),
  },
];

const CustomerForm = ({ fetchBranchInfo, saveCustomer }) => {
  const onSubmit = async (values) => {
    const { payload: customer } = await saveCustomer(values);
    const { payload: branchesFetched } = await fetchBranchInfo(values);

    if (branchesFetched.length) {
      const branchIds = branchesFetched.map((branch) => branch.branch_id);

      socket.emit("customer-connected", {
        values: customer,
        branchIds,
      });
    }
  };

  return (
    <div>
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
                  component="h1"
                  gutterBottom
                >
                  Search For Branches
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
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  branchInfo: state.branchInfo,
  customer: state.customer,
});

const mapDispatchToProps = {
  fetchBranchInfo,
  saveCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
