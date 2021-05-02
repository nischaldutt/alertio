import React from "react";
import { connect } from "react-redux";

import AdminForm from "./AdminForm";
import CustomerForm from "./CustomerForm";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 70px)",
    backgroundColor: theme.palette.primary.main,
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid style={{ border: "2px solid red" }} item xl={1}></Grid>
      <Grid style={{ border: "2px solid green" }} item xl={10}></Grid>
      <Grid style={{ border: "2px solid blue" }} item xl={1}></Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
