import React from "react";
import { connect } from "react-redux";

import { emptyErrorObject } from "../actions";

import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";

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
