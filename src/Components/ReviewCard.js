import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    minWidth: 275,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginBottom: theme.spacing(1),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    <Card elevation={5} className={classes.root}>
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
          {"Authour: " + review.authourName}
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          component="h6"
          variant="h6"
        >
          {review.reviewBody}
        </Typography>
        <Box className={classes.pos}>
          <Typography
            className={classes.pos}
            color="textSecondary"
            component="h6"
            variant="h6"
          >
            {"Rating out of 5=>"}
          </Typography>
          <Rating readOnly value={review.rating} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
