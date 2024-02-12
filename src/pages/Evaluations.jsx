import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styledd from "styled-components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getAgentEvaluations, getTeamMembers, getUserEvaluations, updateActiveUserEvaluationsMonth, updateQualityEvaluationsActiveCategoryForAgent } from "../features/userSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { Button } from "@mui/material";

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

export default function Evaluations() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(dayjs());
    const { user, userEvaluations, isLoading, qualityTeamAverage, qualityTeamTicketsLength, qualityEvaluationsActiveCategoryForAgent } = useSelector((state) => state.userSlice);

    useEffect(() => {
        dispatch(updateActiveUserEvaluationsMonth(dayjs(value).format()));
    }, [dispatch, value]);

    useEffect(() => {
        if (value) {
            if (qualityEvaluationsActiveCategoryForAgent === "quality") dispatch(getUserEvaluations({ date: value.format(), token: localStorage.getItem("token") }));
            else if (qualityEvaluationsActiveCategoryForAgent === "operation") dispatch(getAgentEvaluations({ date: value.format(), token: localStorage.getItem("token") }));
        }
    }, [dispatch, qualityEvaluationsActiveCategoryForAgent, value]);

    useEffect(() => {
        dispatch(getTeamMembers({ token: localStorage.getItem("token") }));
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {user.role === "agent" && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margiTop: "15px" }}>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(updateQualityEvaluationsActiveCategoryForAgent("quality"))}
                        style={{
                            backgroundColor: qualityEvaluationsActiveCategoryForAgent == "quality" ? "#3EEDBF" : "#2196f3",
                            color: qualityEvaluationsActiveCategoryForAgent == "quality" ? "#000" : "#fff",
                        }}>
                        Quality
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(updateQualityEvaluationsActiveCategoryForAgent("operation"))}
                        style={{
                            backgroundColor: qualityEvaluationsActiveCategoryForAgent == "operation" ? "#3EEDBF" : "#2196f3",
                            color: qualityEvaluationsActiveCategoryForAgent == "operation" ? "#000" : "#fff",
                        }}>
                        Operation
                    </Button>
                </div>
            )}

            {qualityTeamTicketsLength && (
                <header style={{ display: "flex", justifyContent: "space-evenly", padding: "20px 0", fontSize: "30px" }}>
                    <h2>
                        {qualityTeamTicketsLength} <span style={{ fontSize: "20px" }}>tickets</span>
                    </h2>
                    <h2>{qualityTeamAverage?.toFixed(2)}%</h2>
                </header>
            )}

            <Wrapper>
                <h2 className="chossen-date">{value.format("MMMM")}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Pick a date"
                                value={value}
                                views={["month"]}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </Wrapper>

            <br />
            {qualityTeamTicketsLength ? (
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="center">Agent</StyledTableCell>
                                <StyledTableCell align="center">Ticket</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Score</StyledTableCell>
                                <StyledTableCell align="center">Comment</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userEvaluations?.map((eva, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell
                                            component="th"
                                            scope="row">
                                            {eva.date}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Link>{eva.to.name}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Link to={`/updateEvaluation/${eva._id}/${value.format("MM-YYYY")}`}>{eva.details.ticket}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{eva.details.ticketType}</StyledTableCell>
                                        <StyledTableCell align="center">{eva.details.score}</StyledTableCell>
                                        <StyledTableCell align="center">{eva.details.comment}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h2>Empty...</h2>
            )}
        </>
    );
}

const Wrapper = styledd.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 2px solid #3eedbf;
    padding-bottom: 20px;
`;
