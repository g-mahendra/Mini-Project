import React, { useState } from "react";
import GrievanceCard from "./Components/GrieveanceCard";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useData } from "./context/DataContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
    maxHeight: "100vh",
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
    elevation: 5,
  },
}));

const Grievance = () => {
  const { grievance } = useData();

  const classes = useStyles();
  return grievance ? (
    grievance.map((post) => {
      return (
        <Container className={classes.container}>
          <GrievanceCard post={post} />
          <Link to="/grievance/addgrievance">
            <IconButton className={classes.iButton} size="medium">
              <AddIcon />
            </IconButton>
          </Link>
        </Container>
      );
    })
  ) : (
    <Container className={classes.container}>
      <CircularProgress size={30} />
    </Container>
  );
};

export default Grievance;
