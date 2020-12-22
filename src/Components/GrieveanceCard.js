import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, CardActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    width: 500,
    marginBottom: 10,
    margin: "auto",
    minWidth: "70%",
    flexDirection: "column",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  cardMedia: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  imageBtn: {
    color: "black",
    padding: theme.spacing(1),
    backgroundColor: "#FFF",
    margin: theme.spacing(1),
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
}));

export default function SimpleCard({ post }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Card justify="center" className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {post.name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.body}
            </Typography>
          </CardContent>
          <CardActions>
            {post.url ? (
              <a target="_blank" href={post.url} className={classes.link}>
                <Button variant="contained" className={classes.imageBtn}>
                  View Image of Grievance
                </Button>
              </a>
            ) : null}
          </CardActions>
        </div>
      </Card>
    </Grid>
  );
}
