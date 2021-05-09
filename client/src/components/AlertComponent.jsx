import React from "react";
import { connect } from "react-redux";

import { markAlertAsRead } from "../actions";
import socket from "../socketClient";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40vw",
    [theme.breakpoints.down("md")]: {
      width: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
}));

const AlertComponent = ({ alert, markAlertAsRead }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  let { alert: alertObj, timestamp, is_read, alert_id } = JSON.parse(
    JSON.stringify(alert)
  );
  const { user_name } = JSON.parse(alertObj);
  const time = new Date(Date.parse(timestamp)).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const date = new Date(Date.parse(timestamp)).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleClickOpen = () => {
    setOpen(true);
    if (is_read === 0) {
      // emit alert to server that alert was opened
      socket.emit("alert-opened", { alert_id });
      markAlertAsRead({ alert_id });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderAlertDialogBox = () => {
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Alert!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Customer: ${user_name} searched for you branch.`}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {`${date} ${time}`}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  const buttonAction = (
    <Button color="secondary" size="small" onClick={handleClickOpen}>
      View Details
    </Button>
  );

  return (
    <div>
      {renderAlertDialogBox()}
      {is_read ? (
        <Alert
          className={classes.root}
          action={buttonAction}
          severity="success"
        >
          {`Viewed`}
        </Alert>
      ) : (
        <Alert className={classes.root} action={buttonAction} severity="info">
          {`Unread alert from ${user_name}`}
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {
  markAlertAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
