import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "../history";
import Header from "./Header";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";

import { Grid, ThemeProvider } from "@material-ui/core";
import theme from "../themes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={createBrowserHistory}>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>
          <Grid item container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
