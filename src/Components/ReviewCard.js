import { CardContent, Container, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    minWidth: 275,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginBottom: theme.spacing(1)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ReviewCard = ({ review }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          component="h4"
          variant="h4"
        >
          {review.reviewTitle}
        </Typography>
        <Typography variant="h5" component="h5">
          {"Authour: "+review.authourName}
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          component="h6"
          variant="h6"
        >
          {review.reviewBody}
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          component="h6"
          variant="h6"
        >
          {"Rating out of 5  "+review.rating}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
