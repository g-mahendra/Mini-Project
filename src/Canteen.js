import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import MainFeaturedPost from "./Blog/MainFeaturedPost";
import TableCanteen from "./Components/TableCanteen";
import { useUser } from "./context/UserContext";

const useStyles = makeStyles({
  item: {
    margin: 10,
  },
  mainGrid: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  pictureBox: {
    width: "100%",
  },
  contentGrid: { display: "flex", flexDirection: "column" },
  dTitle: {
    marginBottom: 20,
  },
  timeGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
  },
  timeBox: { display: "flex", flexDirection: "column" },
  editBtn: {
    padding: "1%",
    width: 100,
    color: "#000",
    backgroundColor: "#FFF",
  },
});

const Canteen = (props) => {
  const { item } = props.location.state;
  const classes = useStyles();
  const { user } = useUser();
  var nowUser = "Student";

  if (user) {
    nowUser = user.type.toString();
  }

  const post = {
    image:
      "https://wallup.net/wp-content/uploads/2017/03/29/490310-Fries-tomatoes-food.jpg",
    imageText: "Mess name can be very lo",
    title: "A longr name of Mess is like this",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  return (
    <Grid
      sm={12}
      md={12}
      xs={12}
      lg={12}
      className={classes.mainGrid}
      container
    >
      <Box className={classes.pictureBox}>
        <MainFeaturedPost post={{ ...post, description: "" }} />
      </Box>
      <Grid item container sm={12} md={12} xs={12}>
        <Grid className={classes.contentGrid} item md={7} sm={7} xs={12}>
          <Container>
            <Box className={classes.dTitle}>
              <Typography variant="h3" component="b">
                Description
              </Typography>
            </Box>
            <Typography variant="h5" component="p" paragraph>
              {post.description}
            </Typography>
          </Container>
        </Grid>
        <Grid className={classes.timeGrid} item md={5} sm={5} xs={12}>
          <Paper className={classes.paper}>
            <Paper className={classes.paper} elevation={4}>
              <Box className={classes.timeBox}>
                <Typography className={classes.item} variant="p" component="i">
                  Opening Time
                </Typography>
                <Typography className={classes.item} variant="p" component="i">
                  Clsoing Time
                </Typography>
              </Box>
              <Box className={classes.timeBox}>
                <Typography className={classes.item} variant="p" component="i">
                  8:00 AM
                </Typography>
                <Typography className={classes.item} variant="p" component="i">
                  9:00 PM
                </Typography>
              </Box>
            </Paper>
          </Paper>
        </Grid>
        <Grid md={7} sm={8} xs={12} container style={{ marginLeft: "20px" }}>
          <Box className={classes.dTitle}>
            <Typography variant="h3" component="b">
              Menu
            </Typography>
          </Box>
          {nowUser === "Mess Owner" ? (
            <Button className={classes.editBtn} variant="outlined">
              Edit
            </Button>
          ) : null}
          <TableCanteen />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Canteen;
