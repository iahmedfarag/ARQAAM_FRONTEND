/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableRowComponent from "./TableRowComponent";
import { tableHeadCells } from "../utils/commonData";
import TotalRowComponents from "./TotalRowComponents";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function CommonTable({ numbers, total }) {
    if (!numbers | !total) {
        return <h2 style={{ marginTop: "50px", textAlign: "center" }}>not updated yet</h2>;
    }

    console.log(numbers);

    return (
        <TableContainer
            component={Paper}
            style={{ marginTop: "15px" }}>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {tableHeadCells.map((cell, index) => {
                            return <StyledTableCell key={index}>{cell}</StyledTableCell>;
                        })}
                    </TableRow>
                </TableHead>
                {
                    <TableBody>
                        {/* agents */}
                        {numbers?.map((number, index) => {
                            return (
                                <TableRowComponent
                                    number={number}
                                    key={index}
                                    rowFor={"agent-cell"}
                                />
                            );
                        })}

                        {/* TOTAL */}
                        <TotalRowComponents total={total} />
                    </TableBody>
                }
            </Table>
        </TableContainer>
    );
}
