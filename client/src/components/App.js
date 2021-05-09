import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import createBrowserHistory from "../history";
import Header from "./Header";
import ErrorComponent from "./ErrorComponent";
import routes from "../routes";

import { Grid, ThemeProvider, makeStyles } from "@material-ui/core";
import light from "../themes/lightTheme";
import dark from "../themes/darkTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexFlow: "column",
  },
  header: {},
  content: {
    height: "100%",
  },
}));

const renderRoutes = () => {
  return routes.map((route) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    );
  });
};

const App = ({ darkTheme }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <Router history={createBrowserHistory}>
        <Grid container direction="column" className={classes.root}>
          <Grid item className={classes.header}>
            <Header />
          </Grid>

          <ErrorComponent />

          <Grid item container className={classes.content} justify="center">
            <Switch>{renderRoutes()}</Switch>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
