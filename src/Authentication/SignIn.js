import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, CircularProgress } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { useHistory, Link, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  alert:{
    marginTop: theme.spacing(2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, currentUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signin(email, password);
      history.push("/");
    } catch (e) {
      if (e.message === "The email address is badly formatted.") {
        setErr("Enter email correctly");
      } else if (
        e.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        setErr("User not found! Make sure you typed correct email");
      } else setErr("Password did not match! Please type the correct password");
    }
    setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const text = "Sign In";

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {err ? (
          <Alert
            className={classes.alert}
            severity="error"
            variant="standard"
            fullWidth
            onClick={() => setErr("")}
          >
            {err}
          </Alert>
        ) : null}
        <Box className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
            disabled={loading ? true : false}
          >
            {loading ? <CircularProgress /> : text}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
