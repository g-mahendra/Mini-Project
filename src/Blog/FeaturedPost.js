import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Rating from "@material-ui/lab/Rating";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
    margin: "auto",
    minWidth: 300
  },
  cardDetails: {
    flex: 1,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.reviewTitle}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {post.authourName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.reviewBody}
            </Typography>
            <Box style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
            <Typography variant="subtitle1" paragraph>
              {`Rating out of 5: `}
            </Typography>
            <Rating readOnly value={post.rating}/>
            </Box>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={null}
            title={null}
          />
        </Hidden>
      </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
