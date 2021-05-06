import React from "react";
import { connect } from "react-redux";
import { Button, Slide } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { emptyErrorObject } from "../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorComponent = ({ error, emptyErrorObject }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    emptyErrorObject();
  };

  return (
    error && (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Oops! An Error Occurred :(
        </DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(error, 0, 2)}</pre>
        </DialogContent>
      </Dialog>
    )
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

const mapDispatchToProps = {
  emptyErrorObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
