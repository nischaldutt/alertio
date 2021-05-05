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

import { Grid, ThemeProvider } from "@material-ui/core";
import light from "../themes/lightTheme";
import dark from "../themes/darkTheme";

const App = ({ darkTheme }) => {
  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <Router history={createBrowserHistory}>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>

          <Grid item container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin" exact component={AdminLogin} />
              <Route path="/customer" exact component={CustomerSearch} />
              <Route path="/admin/dashboard" exact component={AdminDashboard} />
              <Route
                path="/admin/notifications"
                exact
                component={AdminNotifications}
              />
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
