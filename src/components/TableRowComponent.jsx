/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { StyledTableCell, StyledTableRow } from "./CommonTable";

export default function TableRowComponent({ number, rowFor }) {
    if (!number) {
        return;
    }

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

    if (number) {
        return (
            <StyledTableRow>
                <StyledTableCell
                    component="th"
                    scope="row">
                    <a href="/">{number?.agent}</a>
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
                <StyledTableCell align="center">
                    {number?.KCSAT}
                    <div></div>
                </StyledTableCell>
                <StyledTableCell align="center">{number?.PPH}</StyledTableCell>
                <StyledTableCell align="center">{number?.PPD}</StyledTableCell>
                <StyledTableCell align="center">{number?.PMTD}</StyledTableCell>
                <StyledTableCell align="center">{number?.closedCases}</StyledTableCell>
                <StyledTableCell align="center">{(number?.responseRate).toFixed(2)}%</StyledTableCell>
                <StyledTableCell align="center">{number?.QAEvaulations}</StyledTableCell>
                <StyledTableCell align="center">{number?.QAScore * 100}%</StyledTableCell>
                <StyledTableCell align="center">{number?.IdleTime}</StyledTableCell>
            </StyledTableRow>
        );
    }
}
