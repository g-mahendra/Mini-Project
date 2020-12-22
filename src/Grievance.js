import React, { useEffect, useState } from "react";
import GrievanceCard from "./Components/GrieveanceCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useData } from "./context/DataContext";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#eee",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1%",
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

const Grievance = () => {
  const { grievance } = useData();
  const [data, setData] = useState(null);

  // grievance ? setData(grievance) : setData([]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        {grievance ? (
          grievance.map((post) => <GrievanceCard post={post} />)
        ) : (
          <CircularProgress size={50}>Loading....</CircularProgress>
        )}
        <Link to="/grievance/addgrievance">
          <IconButton className={classes.iButton} size="medium">
            <AddIcon />
          </IconButton>
        </Link>
      </Container>
    </Box>
  );
};

export default Grievance;
