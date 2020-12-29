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

export default function TableCanteen({ menu }) {
  const classes = useStyles();
  var count = 1;
  let i = 1;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#000" }}>
          <TableRow>
            <TableCell className={classes.heading}>Sr.No</TableCell>
            <TableCell className={classes.heading} align="center">
              Dish Name
            </TableCell>
            <TableCell className={classes.heading} align="center">
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menu.map((row) => (
            <TableRow
              style={{ backgroundColor: count++ % 2 === 0 ? "#eee" : "#fff" }}
              key={row._id}
            >
              <TableCell component="th" scope="row">
                {i++}
              </TableCell>
              <TableCell align="center">{row.dish}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
