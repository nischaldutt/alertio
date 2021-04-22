import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
  },
}));

const AlertComponent = ({ alert, severity, alertHeader }) => {
  const classes = useStyles();
  const { alert: alertObj, timestamp } = JSON.parse(JSON.stringify(alert));
  const { user_name, pin_code_searched } = JSON.parse(alertObj);
  const alertText = `Customer: ${user_name} searched for Pin Code = ${pin_code_searched} at ${timestamp}`;
  return (
    <Alert className={classes.root} severity={severity}>
      <AlertTitle>{alertHeader}</AlertTitle>
      {alertText}
    </Alert>
  );
};

export default AlertComponent;
