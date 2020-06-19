import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Login from "./components/login/Login.js";
import Register from "./components/register/register.js";
import Typography from "@material-ui/core/Typography";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    width: "600px",
  },
  title: {
    margin: "auto",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3">
        Welcome to Cromwell
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
