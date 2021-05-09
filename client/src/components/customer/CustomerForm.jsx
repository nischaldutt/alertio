import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";

import socket from "../../socketClient";
import { fetchBranchInfo } from "../../actions";

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

let valuesObj = {};

const CustomerForm = ({ fetchBranchInfo, branchInfo }) => {
  React.useEffect(() => {
    if (branchInfo.length) {
      const branchIds = branchInfo.map((branch) => branch.branch_id);
      socket.emit("customer-connected", {
        values: valuesObj,
        branchIds,
      });
    }
  }, [branchInfo]);

  const onSubmit = (values) => {
    fetchBranchInfo(values);
    valuesObj = { ...values };
    values.pin_code = "";
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
                      color="primary"
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
});

const mapDispatchToProps = {
  fetchBranchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
