import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CostomDialog from "../Components/CostomDialog";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContactUsDialog from "../Components/ContactUsDialog";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const [messOpen, setMessOpen] = React.useState(false);
  const [canteenOpen, setCanteenOpen] = React.useState(false);
  const [cDialog, setCDialog] = useState(false);
  const { signout } = useAuth();
  const history = useHistory();
  const { mess, canteen } = useData();

  const signUserOut = async () => {
    try {
      await signout();
      history.push("/signup");
    } catch (e) {
      console.log(e);
    }
  };

  canteen ? console.log(canteen) : null;
  mess ? console.log(mess) : null;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.link} to="/">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
        </Link>
        <Button onClick={signUserOut} variant="outlined" size="small">
          Sign out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Grid container>
          <Container>
            <List
              className={classes.list}
              component="nav"
              aria-label="main mailbox folders"
            >
              <ListItem
                className={classes.item}
                onClick={() => setMessOpen(!messOpen)}
                button
              >
                <ListItemText primary="Mess" />
              </ListItem>
              {messOpen ? (
                <CostomDialog
                  mess={mess}
                  canteen={null}
                  visible={(isVisible) => setMessOpen(isVisible)}
                />
              ) : null}
              <ListItem
                className={classes.item}
                onClick={() => setCanteenOpen(!canteenOpen)}
                button
              >
                <ListItemText primary="Canteen" />
              </ListItem>
              {canteenOpen ? (
                <CostomDialog
                  mess={null}
                  canteen={canteen}
                  visible={(isVisible) => setCanteenOpen(isVisible)}
                />
              ) : null}
              <ListItem className={classes.item} button>
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  to="/grievance"
                >
                  <ListItemText primary="Grievances" />
                </Link>
              </ListItem>

              <ListItem
                className={classes.item}
                onClick={() => setCDialog(!cDialog)}
                button
              >
                <ListItemText primary="Contact Us" />
              </ListItem>
              {cDialog ? (
                <ContactUsDialog
                  visible={(isVisible) => setCDialog(isVisible)}
                />
              ) : null}
            </List>
          </Container>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
