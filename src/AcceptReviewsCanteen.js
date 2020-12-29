import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CreateIcon from "@material-ui/icons/Create";
import Switch from "@material-ui/core/Switch";
import backend from "./api/backend";
import Alert from "@material-ui/lab/Alert";

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

class AcceptReviewsCanteen extends Component {
  // State Object
  state = {
    authorName: "",
    reviewTitle: "",
    reviewBody: "",
    rating: 0,
    switch: false,
    nameError: "",
    reviewTitleError: "",
    id: "0",
    success: false,
    faliure: false,
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
    try {
      await backend.post("/addreviewcanteen", {
        name: this.state.authorName,
        title: this.state.reviewTitle,
        body: this.state.reviewBody,
        rating: this.state.rating,
        id: this.props.location.state.canteen._id,
      });
    } catch (error) {
      console.log(error);
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
    console.log(this.state.success);
    return (
      <Grid style={styles.outerGrid} container>
        <Grid item container md={1} sm={1} xs={1} />
        <Grid item container md={10} sm={10} xs={10} style={styles.middleGrid}>
          <Paper style={styles.mainPaper} elevation={10}>
            <Typography align="center" gutterBottom noWrap variant="h4">
              <CreateIcon /> Add your review
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
                  Review Title
                </Typography>
                <TextField
                  label="Review Title"
                  required
                  error={this.state.reviewTitleError ? true : false}
                  helperText={
                    this.state.reviewTitleError
                      ? `${this.state.reviewTitleError}`
                      : null
                  }
                  value={this.state.reviewTitle}
                  type="title"
                  placeholder="Enter Review Title"
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
                  Review Body
                </Typography>
                <TextField
                  value={this.state.reviewBody}
                  type="name"
                  label="Review Body"
                  variant="outlined"
                  style={styles.input}
                  margin="normal"
                  multiline
                  placeholder="Enter Review Here"
                  onChange={(newValue) => {
                    this.setState({
                      reviewBody: newValue.target.value,
                    });
                  }}
                />
                <Typography style={styles.label} variant="h5" component="h5">
                  Rate your experience
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={this.state.rating}
                  onChange={(event, newValue) => {
                    this.setState({
                      rating: newValue,
                    });
                  }}
                />
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
                    Submit Review
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

export default AcceptReviewsCanteen;
