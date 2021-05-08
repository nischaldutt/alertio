import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import createBrowserHistory from "../history";
import Header from "./Header";
import Home from "./Home";
import AdminLogin from "./admin/AdminLogin";
import CustomerSearch from "./customer/CustomerSearch";
import AdminDashboard from "./admin/AdminDashboard";
import AdminNotifications from "./admin/AdminNotifications";
import ErrorComponent from "./ErrorComponent";

import { Grid, ThemeProvider, makeStyles } from "@material-ui/core";
import light from "../themes/lightTheme";
import dark from "../themes/darkTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexFlow: "column",
    // border: "2px solid blue",
  },
  header: {
    // height: "70px",
  },
  content: {
    height: "100%",
  },
}));

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
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin" exact component={AdminLogin} />
              <Route path="/admin/dashboard" exact component={AdminDashboard} />
              <Route
                path="/admin/notifications"
                exact
                component={AdminNotifications}
              />
              <Route path="/customer" exact component={CustomerSearch} />
            </Switch>
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
