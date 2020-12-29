import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    maxWidth: 650,
  },
  heading: {
    fontWeight: "bolder",
    color: "#FFF",
  },
});

export default function TableComponent({ timetable }) {
  const classes = useStyles();
  var count = 1;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#000" }}>
          <TableRow>
            <TableCell className={classes.heading}>Week Days</TableCell>
            <TableCell className={classes.heading} align="center">
              Breakfast
            </TableCell>
            <TableCell className={classes.heading} align="center">
              Lunch
            </TableCell>
            <TableCell className={classes.heading} align="center">
              Dinner
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timetable.map((row) => (
            <TableRow
              style={{ backgroundColor: count++ % 2 === 0 ? "#eee" : "#fff" }}
              key={row._id}
            >
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="center">{row.breakfast}</TableCell>
              <TableCell align="center">{row.lunch}</TableCell>
              <TableCell align="center">{row.dinner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
