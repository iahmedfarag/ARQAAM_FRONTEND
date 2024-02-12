import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function SubHeader() {
    const { theTops } = useSelector((state) => state.teamNumbersSlice);

    if (!theTops) {
        return;
    }

    return (
        <TableContainer
            component={Paper}
            style={{ marginTop: "20px" }}>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            Top Of Accuration <span className="circle">{(theTops?.CSAT?.CSAT * 100).toFixed(2)}%</span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Top Of Solved Cases <span className="circle">{theTops?.KCSAT?.KCSAT}</span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Top of Productivity <span className="circle">{theTops?.PMTD?.PMTD}</span>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell
                            component="th"
                            scope="row"
                            align="center">
                            {theTops?.CSAT?.agent}
                        </StyledTableCell>
                        <StyledTableCell
                            component="th"
                            scope="row"
                            align="center">
                            {theTops?.KCSAT?.agent}
                        </StyledTableCell>
                        <StyledTableCell
                            component="th"
                            scope="row"
                            align="center">
                            {theTops?.PMTD?.agent}
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
