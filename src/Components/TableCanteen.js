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
        maxWidth: 500,
    },
});

function createData(srno, dish1, price) {
    return { srno, dish1, price };
}

const rows = [
    createData("1", "dish1", "price"),
    createData("2", "dish1", "price"),
    createData("3", "dish1", "price"),
    createData("4", "dish1", "price"),
    createData("5", "dish1", "price"),
    createData("6", "dish1", "price"),
];

export default function TableComponent() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>srno</TableCell>
                        <TableCell align="center">Dishes</TableCell>
                        <TableCell align="center">Price</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.srno}
                            </TableCell>
                            <TableCell align="center">{row.dish1}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
