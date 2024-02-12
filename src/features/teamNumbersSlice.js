import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/customFetch";
import { isExpired } from "react-jwt";
import { graphFilterationOptions } from "../utils/commonData";

const initialState = {
    isLoading: false,
    isError: false,
    activeDate: null,
    fakeDate: null,

    teamNumbersDaily: null,
    total: null,
    theTops: null,

    teamNumbersMonthly: null,
    activeTeamHistoryMonth: null,

    teamNumbersForGraph: null,
    teamNumbersGraphOptions: graphFilterationOptions,
    teamNumbersGraphActiveOption: "Tickets_Calls",
};

export const addNumbersToTeam = createAsyncThunk("add-numbers-to-team", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.post(
            "team/operation/addNumbersToTeam",
            { date: data.date, teamNumbers: data.teamNumbers },
            {
                headers: {
                    authorization: data.token,
                },
            }
        );
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getTeamNumbersPerDay = createAsyncThunk("get-operation-team-numbers-per-day", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`team/operation/getTeamNumbersPerDay/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error, "from here------------");
    }
});

export const getTeamNumbersPerMonth = createAsyncThunk("get-team-numbers-per-month", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`team/operation/getTeamNumbersPerMonth/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// slice
export const teamNumbersSlice = createSlice({
    name: "teamNumbersSlice",
    initialState,
    reducers: {
        updateActiveDate: (state, action) => {
            state.activeDate = action.payload;
        },
        updateActiveTeamHistoryMonth: (state, action) => {
            state.activeTeamHistoryMonth = action.payload;
        },
        updateTeamNumbersGraphActiveOption: (state, option) => {
            state.teamNumbersGraphActiveOption = option.payload;
        },
        clearDataBeforeLogout: (state) => {
            state.teamNumbersDaily = null;
            state.total = null;
            state.theTops = null;
            state.teamNumbersMonthly = null;
            state.teamNumbersForGraph = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // add numbers to a team
            .addCase(addNumbersToTeam.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(addNumbersToTeam.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.total = payload.teamNumbers.total;
                state.theTops = payload.teamNumbers.theTops;
                state.teamNumbersDaily = payload.teamNumbers.performance;
            })

            .addCase(addNumbersToTeam.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
                state.isError = true;
            })

            // get team numbers per date
            .addCase(getTeamNumbersPerDay.pending, (state, action) => {
                state.isTokenExpired = isExpired(action.meta.arg.token);
                state.isLoading = true;
            })

            .addCase(getTeamNumbersPerDay.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                console.log(payload);
                if (payload?.teamNumbers) {
                    state.total = payload.teamNumbers.total;
                    state.theTops = payload.teamNumbers.theTops;
                    state.teamNumbersDaily = payload.teamNumbers.performance;
                } else {
                    state.total = null;
                    state.theTops = null;
                    state.teamNumbersDaily = null;
                }
            })

            .addCase(getTeamNumbersPerDay.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
                state.isError = true;
            })

            // get team numbers
            .addCase(getTeamNumbersPerMonth.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getTeamNumbersPerMonth.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                if (payload.teamNumbers) {
                    state.teamNumbersMonthly = payload.teamNumbers;
                    state.teamNumbersForGraph = payload.teamNumbers.map((number) => {
                        return {
                            date: number.date,
                            Accurate: number.total.CSAT * 100,
                            Solved: number.total.KCSAT,
                            QAScore: number.total.QAScore * 100,
                            IdleTime: number.total.IdleTime,
                            PMTD: number.total.PMTD,
                            PPD: number.total.PPD,
                            PPH: number.total.PPH,
                            closedCases: number.total.closedCases,
                            responseRate: number.total.responseRate,
                            Tickets_Calls: number.total.surveys,
                        };
                    });
                } else {
                    state.teamNumbersMonthly = null;
                    state.teamNumbersForGraph = null;
                }
            })

            .addCase(getTeamNumbersPerMonth.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
                if (payload.response.data.message === "not updated yet") {
                    state.teamNumbersMonthly = null;
                    state.teamNumbersForGraph = null;
                    return;
                }
                state.isError = true;
            });
    },
});

export const { updateActiveDate, updateActiveTeamHistoryMonth, updateTeamNumbersGraphActiveOption, clearDataBeforeLogout } = teamNumbersSlice.actions;

export default teamNumbersSlice.reducer;
