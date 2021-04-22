import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";

import AlertComponent from "./AlertComponent";
import Loading from "./Loading";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: "10px",
  },
}));

const AdminNotifications = ({ alerts, realTimeAlerts }) => {
  const classes = useStyles();

  const renderRealTimeAlerts = useCallback(() => {
    return realTimeAlerts.map((alert, index) => {
      return (
        <Grid item key={index}>
          <AlertComponent
            severity="warning"
            alert={alert}
            alertHeader="New Alert"
          />
        </Grid>
      );
    });
  }, [realTimeAlerts]);

  useEffect(() => {
    renderRealTimeAlerts();
  }, [realTimeAlerts, renderRealTimeAlerts]);

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
        {renderRealTimeAlerts()}
        {!alerts.length ? <Loading /> : renderAlerts()}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  alerts: state.alerts,
  realTimeAlerts: state.realTimeAlerts,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNotifications);
