import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MainFeaturedPost from "./Blog/MainFeaturedPost";
import TableComponent from "./Components/TableComponent";
import FeaturedPost from "./Blog/FeaturedPost";
import { Link } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { useData } from "./context/DataContext";

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
    justifyContent: "flex-start",
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
  },
  timeBox: { display: "flex", flexDirection: "column" },
  link: {
    textDecoration: "none",
    color: "black",
  },
  editBtn: {
    padding: "1%",
    width: 100,
    color: "#000",
    backgroundColor: "#FFF",
  },
});

const Mess = (props) => {
  const { item } = props.location.state;
  const classes = useStyles();
  const { user } = useUser();
  const { mess, updateComponent } = useData();
  var nowUser = "Student";
  const [thisMessTimetable, setThisMessTimetable] = useState();
  const [thisMessReviews, setThisMessReviews] = useState();

  if (user) {
    nowUser = user.type.toString();
  }

  useEffect(() => {
    updateComponent();
    if (mess) {
      const currentMess = mess.find((each) => each._id === item._id);
      setThisMessTimetable(currentMess.timetable);
      setThisMessReviews(currentMess.reviews);
    }
  }, [mess]);

  const post = {
    image:
      "https://wallup.net/wp-content/uploads/2017/03/29/490310-Fries-tomatoes-food.jpg",
    imageText: "Mess name can be very lo",
    title: `${item.name}`,
    description: `${item.information}`,
  };
  let i = 0;
  return (
    <Grid className={classes.mainGrid} container>
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
            <Box className={classes.dTitle}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" component="b">
                  Time Table
                </Typography>
                {nowUser === "Mess Owner" &&
                item.name.replaceAll(" ", "").toLowerCase() ===
                  user.service.replaceAll(" ", "").toLowerCase() ? (
                  <Link
                    className={classes.link}
                    to={{
                      pathname: "/mess/update",
                      state: { mess: item, canteen: {} },
                    }}
                  >
                    <Button className={classes.editBtn} variant="contained">
                      Edit
                    </Button>
                  </Link>
                ) : null}
              </Box>

              {thisMessTimetable ? (
                <TableComponent timetable={thisMessTimetable} />
              ) : (
                <CircularProgress size={50} />
              )}
            </Box>
          </Container>
        </Grid>
        <Grid className={classes.timeGrid} item md={5} sm={5} xs={12}>
          <Paper className={classes.paper}>
            <Paper className={classes.paper} elevation={4}>
              <Box className={classes.timeBox}>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  Opening Time
                </Typography>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  Closing Time
                </Typography>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  Rate
                </Typography>
              </Box>
              <Box className={classes.timeBox}>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  {item.openingTime}
                </Typography>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  {item.closingTime}
                </Typography>
                <Typography
                  className={classes.item}
                  variant="body2"
                  component="i"
                >
                  {item.pricePerMonth + " Per Month"}
                </Typography>
              </Box>
            </Paper>
          </Paper>
          <Typography className={classes.item} variant="h4" component="b">
            Reviews
          </Typography>
          <Box>
            {thisMessReviews ? (
              thisMessReviews
                .slice(0, 2)
                .map((post) => <FeaturedPost key={post.title} post={post} />)
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link
              className={classes.link}
              to={{
                pathname: "/mess/reviews",
                state: { reviews: thisMessReviews },
              }}
            >
              <Button
                variant="outlined"
                style={{ backgroundColor: "#FFF", padding: 10 }}
              >
                More Reviews
              </Button>
            </Link>
            <Link
              className={classes.link}
              to={{
                pathname: "/mess/addreview",
                state: { mess: item },
              }}
            >
              <Button
                variant="outlined"
                style={{ backgroundColor: "#FFF", padding: 10 }}
              >
                Add Review
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Mess;
