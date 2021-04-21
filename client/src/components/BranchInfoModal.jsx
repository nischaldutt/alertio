import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  branchTable: {
    borderCollapse: "collapse",
    width: "100%",
  },
  data: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
}));

const BranchInfoModal = ({ branchInfo }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (branchInfo.length) {
      handleOpen();
    }
  }, [branchInfo]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderBranches = () => {
    return branchInfo.map((branch) => {
      return (
        <tr key={branch.branch_id} className={classes.data}>
          <td className={classes.data}>{branch.branch_name}</td>
          <td className={classes.data}>{branch.branch_address}</td>
          <td className={classes.data}>{branch.branch_incharge_name}</td>
          <td className={classes.data}>{branch.institute_name}</td>
          <td className={classes.data}>{branch.city_name}</td>
        </tr>
      );
    });
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Branches serving at this pin code.</h2>
      <table className={classes.branchTable}>
        <thead>
          <tr className={classes.data}>
            <th className={classes.data}>Branch name</th>
            <th className={classes.data}>Branch address</th>
            <th className={classes.data}>Branch incharge</th>
            <th className={classes.data}>Institute</th>
            <th className={classes.data}>City</th>
          </tr>
        </thead>
        <tbody>{renderBranches()}</tbody>
      </table>
    </div>
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  branchInfo: state.branchInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BranchInfoModal);
