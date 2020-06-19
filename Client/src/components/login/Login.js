import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginHttp as login } from "./loginslice.js";
import { selectErrorMessage, selectUser, selectPending } from "./loginslice.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const pending = useSelector(selectPending);
  const currentUser = useSelector(selectUser);

  //   const [username, setUsername] = useState("");
  //   const usernameEmpty = Boolean(username);
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      })
    );
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">Please Log In</Typography>
        <Typography>
          Dont have an account?{" "}
          <Link to="/register">Click here to register</Link>
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField margin="normal" fullWidth id="username" label="Username" />

          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {currentUser && <Alert severity="success">Logged In!</Alert>}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="small"
            disabled={pending}
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
