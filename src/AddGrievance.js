import React, { Component, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import Box from "@material-ui/core/Box";
import CreateIcon from "@material-ui/icons/Create";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import { storage } from "./firebase/firebase";

// Styles object for all styles in page
const styles = {
  outerGrid: {
    height: "100vh",
  },
  middleGrid: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    flexDirection: "column",
  },
  mainPaper: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    border: "2px solid",
  },
  formGroup: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    marginTop: 10,
  },
  input: {
    width: 300,
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "space-evenly",
    display: "flex",
    marginTop: 20,
  },
  switchBox: {
    display: "flex",
    flexDirection: "row",
  },
  switch: {
    color: "#304FFE",
  },
  submitButton: {
    backgroundColor: "#304FFE",
    color: "white",
    padding: 10,
  },
  resetButton: {
    backgroundColor: "#FFF",
    color: "#304FFE",
    padding: 10,
  },
};

// Regular Expressions for validation of name and review title
const nameREG = /^[a-zA-Z ]{4,20}$/;
const reviewTitleREG = /^[a-zA-Z0-9 ]{10,100}$/;

class AcceptReviews extends Component {
  // State Object
  state = {
    authorName: "",
    reviewTitle: "",
    reviewBody: "",
    switch: false,
    nameError: "",
    reviewTitleError: "",
    image: "",
    url: "",
  };

  // Function to handle reseting of form
  onReset() {
    this.setState({
      authorName: "",
      reviewTitle: "",
      reviewBody: "",
      rating: 0,
      switch: false,
      nameError: "",
      reviewTitleError: "",
    });
  }

  // Function for form validation
  validateData(reg, field) {
    if (!reg.test(field)) {
      if (reg === nameREG) {
        this.setState({
          nameError:
            "Name must contain letters only and length should be between 4 to 20 charecters",
        });
        return false;
      } else if (reg === reviewTitleREG) {
        this.setState({
          reviewTitleError:
            "Review title must contain letters and numbers length should be between 10 to 100 charecters",
        });
        return false;
      }
    }
    this.setState({
      nameError: "",
      reviewTitleError: "",
    });
    return true;
  }

  // Function for handeling form submit
  async onSubmit() {
    if (this.validateData(reviewTitleREG, this.state.reviewTitle))
      console.log("Valid");
    else return console.log("Invalid");
    console.log("starting upload");

    if (this.state.image !== "") {
      try {
        const uploadTask = await storage
          .ref(`/images/${this.state.image.name}`)
          .put(this.state.image);
        uploadTask.task.on(
          "state_changed",
          (snapshot) => console.log(snapshot),
          (err) => console.log(err),
          () => {
            storage
              .ref("images")
              .child(this.state.image.name)
              .getDownloadURL()
              .then((url) => {
                this.setState({
                  url: url,
                });
                console.log(url);
              })
              .then(async () => {
                await axios.post("http://localhost:5000/addgrievance", {
                  title: this.state.reviewTitle,
                  name: this.state.authorName,
                  body: this.state.reviewBody,
                  url: this.state.url,
                });
              })
              .catch((e) => console.log(e));
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      await axios.post("http://localhost:5000/addgrievance", {
        title: this.state.reviewTitle,
        name: this.state.authorName,
        body: this.state.reviewBody,
        url: "",
      });
    }
  }

  // Function for handleing anonymous switch
  handleChange() {
    if (!this.state.switch) {
      this.setState({
        switch: !this.state.switch,
        authorName: "anonymous",
      });
    } else {
      this.setState({
        switch: !this.state.switch,
        authorName: "",
      });
    }
  }
  // Render method
  render() {
    this.state.image ? console.log(this.state.image) : null;
    return (
      <Grid style={styles.outerGrid} container>
        <Grid item container md={1} sm={1} xs={1} />
        <Grid item container md={10} sm={10} xs={10} style={styles.middleGrid}>
          <Paper style={styles.mainPaper} elevation={4}>
            <Typography align="center" gutterBottom noWrap variant="h4">
              <CreateIcon /> Add your Grievance
            </Typography>
            <Divider />
            <form>
              <FormGroup style={styles.formGroup}>
                <Box style={styles.switchBox}>
                  <Typography gutterBottom variant="h5" component="h5">
                    Make me anonymous
                  </Typography>
                  <Switch
                    checked={this.state.switch}
                    onChange={() => this.handleChange()}
                    color="primary"
                    style={styles.switch}
                  />
                </Box>
                {!this.state.switch ? (
                  <Box>
                    <Typography
                      style={styles.label}
                      variant="h5"
                      component="h5"
                    >
                      Author's Full Name
                    </Typography>
                    <TextField
                      label="Author's Name"
                      required
                      error={this.state.nameError ? true : false}
                      helperText={
                        this.state.nameError ? `${this.state.nameError}` : null
                      }
                      value={this.state.authorName}
                      placeholder="Enter Author's Name"
                      type="name"
                      variant="outlined"
                      style={styles.input}
                      margin="normal"
                      onChange={(newValue) => {
                        this.setState({
                          authorName: newValue.target.value,
                        });
                        this.validateData(nameREG, newValue.target.value);
                      }}
                    />
                  </Box>
                ) : null}
                <Typography style={styles.label} variant="h5" component="h5">
                  Title
                </Typography>
                <TextField
                  label="Grievance Title"
                  required
                  error={this.state.reviewTitleError ? true : false}
                  helperText={
                    this.state.reviewTitleError
                      ? `${this.state.reviewTitleError}`
                      : null
                  }
                  value={this.state.reviewTitle}
                  type="title"
                  placeholder="Enter Title"
                  variant="outlined"
                  style={styles.input}
                  margin="normal"
                  onChange={(newValue) => {
                    this.setState({
                      reviewTitle: newValue.target.value,
                    });
                    this.validateData(reviewTitleREG, this.state.reviewTitle);
                  }}
                />
                <Typography style={styles.label} variant="h5" component="h5">
                  Body
                </Typography>
                <TextField
                  value={this.state.reviewBody}
                  type="name"
                  label="Grievance Body"
                  variant="outlined"
                  style={styles.input}
                  margin="normal"
                  multiline
                  placeholder="Enter grievance Here"
                  onChange={(newValue) => {
                    this.setState({
                      reviewBody: newValue.target.value,
                    });
                  }}
                />
                <Typography gutterBottom variant="h6" component="h6">
                  Submit images if any...
                </Typography>
                <input
                  type="file"
                  onChange={({ target }) =>
                    this.setState({
                      image: target.files[0],
                    })
                  }
                ></input>
                <Box style={styles.buttonBox}>
                  <Button
                    onClick={() => this.onReset()}
                    type="reset"
                    variant="contained"
                    style={styles.resetButton}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => this.onSubmit()}
                    type="reset"
                    variant="contained"
                    style={styles.submitButton}
                  >
                    Submit
                  </Button>
                </Box>
              </FormGroup>
            </form>
          </Paper>
        </Grid>
        <Grid item container md={1} sm={1} xs={1} />
      </Grid>
    );
  }
}

export default AcceptReviews;
