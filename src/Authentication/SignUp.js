import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import backend from '../api/backend'; 
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radioGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  radioGrp: { display: "flex", flexDirection: "row" },
}));

const emailReg = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
const fnameREG = /^[a-zA-Z ]{4,20}$/;
const lnameREG = /^[a-zA-Z ]{4,20}$/;

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [radio, setRadio] = useState("Student");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const history = useHistory();

  const validateData = (reg, field) => {
    if (!reg.test(field)) {
      if (reg === fnameREG) {
        setFnameError("Name should be charecters only and length 4 to 20");
        return false;
      } else if (reg === emailReg) {
        setEmailError("Email must be valid email address");
        return false;
      } else if (reg === lnameREG) {
        setLnameError("Name should be charecters only and length 4 to 20");
        return false;
      }
    }
    setFnameError("");
    setLnameError("");
    setEmailError("");
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signup(email, password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
    try {
      await backend.post("/signup", {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        type: radio,
        service: service,
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {currentUser ? (
          <Alert severity="warning">You are already logged in!</Alert>
        ) : (
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={fName}
                    onChange={({ target }) => {
                      setFname(target.value);
                      validateData(fnameREG, target.value);
                    }}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={fnameError ? true : false}
                    helperText={fnameError ? `${fnameError}` : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={lName}
                    onChange={({ target }) => {
                      setLname(target.value);
                      validateData(lnameREG, target.value);
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    error={lnameError ? true : false}
                    helperText={lnameError ? `${lnameError}` : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={({ target }) => {
                      setEmail(target.value);
                      validateData(emailReg, target.value);
                    }}
                    error={emailError ? true : false}
                    helperText={emailError ? `${emailError}` : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    error={passwordError ? true : false}
                    helperText={passwordError ? `${passwordError}` : null}
                  />
                </Grid>
                <Grid className={classes.radioGrid} item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">User Type</FormLabel>
                    <RadioGroup
                      className={classes.radioGrp}
                      aria-label={`User Type`}
                      name={`User Type1`}
                      value={radio}
                      onChange={({ target }) => setRadio(target.value)}
                    >
                      <FormControlLabel
                        value={`Student`}
                        control={<Radio />}
                        label={`Student`}
                      />
                      <FormControlLabel
                        value={`Mess Owner`}
                        control={<Radio />}
                        label={`Mess Owner`}
                      />
                      <FormControlLabel
                        value={`Canteen Owner`}
                        control={<Radio />}
                        label={`Canteen Owner`}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {radio !== "Student" ? (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Service"
                      label="Service"
                      type="Service"
                      id="Service"
                      autoComplete
                      value={service}
                      onChange={({ target }) => setService(target.value)}
                      error={passwordError ? true : false}
                    />
                  </Grid>
                ) : null}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={loading ? true : false}
              >
                {loading ? <CircularProgress /> : `Sign Up`}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signin">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
