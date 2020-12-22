import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  contactBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  mainBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // padding: 20
  },
  paper: {
    padding: 20,
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Contact Us</DialogTitle>
      <Box className={classes.mainBox}>
        <Box className={classes.contactBox}>Email:</Box>
        <Box className={classes.contactBox}>
          <Paper className={classes.paper} elevation={3}>
            test@test.com
          </Paper>
        </Box>
      </Box>
      <Box className={classes.mainBox}>
        <Box className={classes.contactBox}>LinkedIn:</Box>
        <Box className={classes.contactBox}>
          <Paper className={classes.paper} elevation={3}>
            test@test.com
          </Paper>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ContactUsDialog({ visible }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (value) => {
    setOpen(false);
    visible(!open);
  };

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
