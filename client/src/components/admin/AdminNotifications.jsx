import React from "react";
import { connect } from "react-redux";

import AlertComponent from "../AlertComponent";
import Loading from "../Loading";
import { checkIfAdminLoggedIn } from "../../actions";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const AdminNotifications = ({ checkIfAdminLoggedIn, loggedIn, alerts }) => {
  const classes = useStyles();

  // check if admin session is present after refresh
  // React.useEffect(() => {
  //   if(loggedIn && !alerts.length) {

  //   }
  // }, [checkIfAdminLoggedIn]);

  const renderAlerts = () => {
    return alerts.map((alert) => {
      return (
        <Grid item key={alert.alert_id}>
          <AlertComponent severity="info" alert={alert} alertHeader="Alert" />
        </Grid>
      );
    });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={1}
      className={classes.root}
    >
      {!alerts.length ? <Loading /> : renderAlerts()}
    </Grid>
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
