import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setPending(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3100/user", {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      });
      setPending(false);
      setSuccess(true);
    } catch (err) {
      setPending(false);

      setErrorMessage(err.response.data);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">Registration</Typography>
        <Typography>
          Already have an account? <Link to="/">Click here to sign in</Link>
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField margin="normal" fullWidth id="username" label="Username" />

          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {success && (
            <Alert severity="success">Successfully Registered!</Alert>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="small"
            disabled={pending}
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
