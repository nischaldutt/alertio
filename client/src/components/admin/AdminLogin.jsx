import React from "react";
import { connect } from "react-redux";

import AdminLoginForm from "../admin/AdminLoginForm";
import AdminRegisterForm from "../admin/AdminRegisterForm";

import { checkIfAdminLoggedIn } from "../../actions";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 70px)",
  },
}));

const AdminLogin = ({ checkIfAdminLoggedIn, loggedIn, error }) => {
  const classes = useStyles();

  // check if admin session is present after refresh
  React.useEffect(() => {
    // if (!loggedIn) {
    checkIfAdminLoggedIn();
    // }
  }, [checkIfAdminLoggedIn]);

  return (
    <Grid
      className={classes.root}
      container
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={5}>
        <AdminLoginForm />
      </Grid>

      <Grid item xs={5}>
        <AdminRegisterForm />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  error: state.error,
});

const mapDispatchToProps = {
  checkIfAdminLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
