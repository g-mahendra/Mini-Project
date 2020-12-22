import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { ListItem, ListItemText, List, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "primary",
  },
});

export default function CostomDialog({ mess, canteen, visible }) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
          visible(!open);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <List className={classes.list}>
            {mess
              ? mess.map((item) => {
                  return (
                    <Link
                      className={classes.link}
                      to={{
                        pathname: "/mess",
                        state: { item },
                      }}
                    >
                      <ListItem button className={classes.item}>
                        <ListItemText primary={`${item.name}`} />
                      </ListItem>
                    </Link>
                  );
                })
              : canteen.map((item) => {
                  return (
                    <Link
                      className={classes.link}
                      to={{
                        pathname: "/canteen",
                        state: { item },
                      }}
                    >
                      <ListItem button className={classes.item}>
                        <ListItemText primary={`${item.name}`} />
                      </ListItem>
                    </Link>
                  );
                })}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
