import React, { useEffect } from "react";
import { connect } from "react-redux";

import AlertComponent from "./AlertComponent";
import Loading from "./Loading";

import { Grid } from "@material-ui/core";

const AdminNotifications = ({ alerts, realTimeAlert }) => {
  const renderAlerts = () => {
    return alerts.map((alert, index) => {
      return (
        <Grid item key={index}>
          <AlertComponent alert={alert} />
        </Grid>
      );
    });
  };

  const renderRealTimeAlert = () => {};

  return (
    <Grid container spacing={2} justify="center">
      {!alerts.length ? <Loading /> : renderAlerts()}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  alerts: state.alerts,
  realTimeAlert: state.realTimeAlert,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNotifications);
