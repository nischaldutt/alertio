import React from "react";
import { connect } from "react-redux";

import Hero from "./Hero";

import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 70px)",
    backgroundColor: theme.palette.primary.main,
  },
  hero: {
    height: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      {/* <Grid
        className={classes.hero}
        style={{ border: "2px solid red" }}
        item
        xs={1}
      ></Grid> */}

      <Grid
        className={classes.hero}
        // style={{ border: "2px solid green" }}
        item
        container
        alignItems="center"
        xs={12}
      >
        <Hero />
      </Grid>

      {/* <Grid
        className={classes.hero}
        style={{ border: "2px solid blue" }}
        item
        xs={1}
      ></Grid> */}
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
