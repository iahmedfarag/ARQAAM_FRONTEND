import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { tableHeadCells } from "../../utils/commonData";
import { Link } from "react-router-dom";

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

const cellStyle = {
    position: "relative",
    zIndex: 3,
    overflow: "hidden",
};
const colorDegreFunc = (num) => {
    const n = num * 100 > 85 ? "#00FF08" : num * 100 > 80 ? "#33C237" : num * 100 > 75 ? "#EE400D" : num * 100 > 70 ? "red" : "#FF6F6F";

    return n;
};
const lineStyle = {
    position: "absolute",
    height: "5px",
    zIndex: -1,
    bottom: "0%",
    left: 0,
    transform: `translateY(-50%)`,
    borderRadius: "20px",
};

export default function TeamHistoryTable() {
    const { teamNumbersMonthly } = useSelector((state) => state.teamNumbersSlice);

    return (
        <TableContainer
            component={Paper}
            style={{ marginTop: "15px" }}>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        {tableHeadCells.map((cell, index) => {
                            if (index === 0) return;
                            return (
                                <StyledTableCell
                                    align="center"
                                    key={index}>
                                    {cell}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {teamNumbersMonthly?.map((number, index) => {
                        return (
                            <StyledTableRow key={index}>
                                {/* //!TODO when click navigate him to the day */}
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    style={{ fontWeight: "bold" }}>
                                    <Link to={`/`}>{number?.date}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.surveys}</StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    style={cellStyle}>
                                    {(number?.total?.CSAT * 100).toFixed(2)}%
                                    <div
                                        style={{
                                            ...lineStyle,
                                            backgroundColor: colorDegreFunc(number?.total?.CSAT),
                                            width: number?.total?.CSAT * 90 + "%",
                                        }}></div>
                                </StyledTableCell>{" "}
                                <StyledTableCell align="center">{number?.total?.KCSAT}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.PPH}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.PPD}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.PMTD}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.closedCases}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.responseRate}%</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.QAEvaulations}</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.QAScore}%</StyledTableCell>
                                <StyledTableCell align="center">{number?.total?.IdleTime}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
