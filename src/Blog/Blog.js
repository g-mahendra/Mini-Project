import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: "Student Grievance System",
  description:
    "A Web platform for Grievance Management regarding Food Quality and Sanitaion",
  image:
    "https://images.unsplash.com/photo-1502957291543-d85480254bf8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fG5pZ2h0fGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=600",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const posts = {
  post1:
    "ities and Mess facilitiesssue Mess Facilitygstdifferent food providers.",
};

const sidebar = {
  title: "About",
  description:
    "We ought to provide a software-based solution in the form of a Real time web hosted environment, mainly",
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      url: "https://github.com/AdityaZade/MiniProject",
    },
  ],
};

export default function Blog() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="How are we useful?" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
