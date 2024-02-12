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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        // padding: 0,
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
export default function MyHistoryTable() {
    const { agentMonthlyNumbers } = useSelector((state) => state.userSlice);

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
    return (
        <TableContainer
            component={Paper}
            style={{ marginTop: "20px" }}>
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
                    {agentMonthlyNumbers?.map((number, index) => {
                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    padding={"normal"}>
                                    {number?.date}
                                </StyledTableCell>
                                <StyledTableCell align="center">{number?.surveys}</StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    style={cellStyle}>
                                    {(number?.CSAT * 100).toFixed(2)}%
                                    <div
                                        style={{
                                            ...lineStyle,
                                            backgroundColor: colorDegreFunc(number?.CSAT),
                                            width: number.CSAT * 90 + "%",
                                        }}></div>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    style={cellStyle}>
                                    {number?.KCSAT}
                                </StyledTableCell>
                                <StyledTableCell align="center">{number?.PPH}</StyledTableCell>
                                <StyledTableCell align="center">{number?.PPD}</StyledTableCell>
                                <StyledTableCell align="center">{number?.PMTD}</StyledTableCell>
                                <StyledTableCell align="center">{number?.closedCases}</StyledTableCell>
                                <StyledTableCell align="center">{number?.responseRate}%</StyledTableCell>
                                <StyledTableCell align="center">{number?.QAEvaulations}</StyledTableCell>
                                <StyledTableCell align="center">{number?.QAScore * 100}%</StyledTableCell>
                                <StyledTableCell align="center">{number?.IdleTime}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
