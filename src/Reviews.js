import { CardContent, Container, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReviewCard from "./Components/ReviewCard";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: '#eee'
  },
  iButton: {
    backgroundColor: "#00f",
    color: "#FFF",
    position: "fixed",
    bottom: "1%",
    right: "20%",
    [theme.breakpoints.down("sm")]: {
      bottom: 10,
      right: 10,
    },
  },
}));

const Review = (props) => {
  const classes = useStyles();
  const { reviews } = props.location.state;

  return reviews.map((item) => {
    return (
      <Container className={classes.container}>
        <ReviewCard review={item} />
        <Link to="/mess/addreview">
          <IconButton className={classes.iButton} size="medium">
            <AddIcon />
          </IconButton>
        </Link>
      </Container>
    );
  });
};

export default Review;
