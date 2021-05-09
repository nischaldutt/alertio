import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";

// import socket from "../../socketClient";
import { adminRegister } from "../../actions";

import { TextField } from "mui-rff";

import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const validate = (values) => {
  const errors = {};
  if (!values.admin_name) {
    errors.admin_name = "Required";
  }
  if (!values.admin_email) {
    errors.admin_email = "Required";
  }
  if (!values.admin_password) {
    errors.admin_password = "Required";
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        type="text"
        label="Enter name"
        name="admin_name"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="email"
        label="Enter Email"
        name="admin_email"
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
        name="admin_password"
        margin="none"
        required={true}
      />
    ),
  },
];

// let username;

const AdminRegisterForm = ({ adminRegister, error }) => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values) => {
    const response = await adminRegister(values);
    if (response && response.status === 200) {
      handleOpen();
    }
    values.admin_name = "";
    values.admin_email = "";
    values.admin_password = "";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="success">
          Admin registered successfully!
        </Alert>
      </Snackbar>
    );
  };

  return (
    <Paper elevation={3}>
      {renderSnackbar()}
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
                Sign up
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

const mapStateToProps = (state) => ({
  error: state.error,
});

const mapDispatchToProps = {
  adminRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegisterForm);
