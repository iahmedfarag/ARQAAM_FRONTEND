/* eslint-disable react/prop-types */
import { StyledTableCell, StyledTableRow } from "./CommonTable";

export default function TotalRowComponents({ total }) {
    console.log(total, "totall");
    return (
        <StyledTableRow style={{ backgroundColor: "#ddd" }}>
            <StyledTableCell
                component="th"
                scope="row"
                align="center"
                style={{ fontWeight: "bold" }}>
                TOTAL
            </StyledTableCell>
            <StyledTableCell align="center">{total?.surveys}</StyledTableCell>
            <StyledTableCell align="center">{total?.CSAT?.toFixed(2) * 100}%</StyledTableCell>
            <StyledTableCell align="center">{total?.KCSAT}</StyledTableCell>
            <StyledTableCell align="center">{total?.PPH}</StyledTableCell>
            <StyledTableCell align="center">{total?.PPD}</StyledTableCell>
            <StyledTableCell align="center">{total?.PMTD}</StyledTableCell>
            <StyledTableCell align="center">{total?.closedCases}</StyledTableCell>
            <StyledTableCell align="center">{total?.responseRate}%</StyledTableCell>
            <StyledTableCell align="center">{total?.QAEvaulations}</StyledTableCell>
            <StyledTableCell align="center">{total?.QAScore * 100}%</StyledTableCell>
            <StyledTableCell align="center">{total?.IdleTime}</StyledTableCell>
        </StyledTableRow>
    );
}
