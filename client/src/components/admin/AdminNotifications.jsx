import React, { useEffect } from "react";
import { connect } from "react-redux";

import AlertComponent from "../AlertComponent";
import Loading from "../Loading";
import { checkIfAdminLoggedIn } from "../../actions";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: "10px",
  },
}));

const AdminNotifications = ({ checkIfAdminLoggedIn, loggedIn, alerts }) => {
  const classes = useStyles();

  // check if admin session is present after refresh
  React.useEffect(() => {
    if (!loggedIn) {
      checkIfAdminLoggedIn();
    }
  }, [checkIfAdminLoggedIn, loggedIn]);

  const renderAlerts = () => {
    return alerts.map((alert, index) => {
      return (
        <Grid item key={index}>
          <AlertComponent severity="info" alert={alert} alertHeader="Alert" />
        </Grid>
      );
    });
  };

  return (
    <div>
      <div className={classes.grow} />
      <Grid container spacing={3} justify="center">
        {!alerts.length ? <Loading /> : renderAlerts()}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.loggedIn,
  alerts: state.alerts,
});

const mapDispatchToProps = {
  checkIfAdminLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNotifications);
