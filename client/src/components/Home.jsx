import React from "react";
import { connect } from "react-redux";

import AdminForm from "./AdminForm";
import CustomerForm from "./CustomerForm";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 70px)",
    overflowY: "scroll",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item container justify="space-evenly">
        <Grid item sm={11} md={3}>
          {/* <AdminForm /> */}
        </Grid>
        <Grid item sm={11} md={3}>
          {/* <CustomerForm /> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
