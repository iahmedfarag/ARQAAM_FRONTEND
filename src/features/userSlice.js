import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/customFetch";
import { decodeToken } from "react-jwt";
import { graphFilterationOptions } from "../utils/commonData";

const getLocalStorage = () => {
    let token = localStorage.getItem("token");
    if (token) {
        return JSON.parse(token);
    } else {
        return null;
    }
};

const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: null,
    isLogged: getLocalStorage() ? true : false,
    token: getLocalStorage(),
    user: getLocalStorage() ? decodeToken(getLocalStorage()) : null,

    // ! agent history (page)
    activeAgentHistoryMonth: null,
    agentMonthlyNumbers: null,
    agentNumbersGraphOptions: graphFilterationOptions,
    activeAgentNumbersGraphOption: "Tickets_Calls",
    agentNumbersForGraph: null,

    // ! evaluation
    evaluation: {
        ticket: null,
        type: null,
        agent: null,

        score: 0,
        conversationFlow: "",
        softSkills: "",
        calrityOfCommunication: "",
        ownership: "",
        solution: "",
        proceduresAndTools: "",
        understanding: "",
        behaviourWithCustomer: "",
        wrongInformation: "",
        dataCompliance: "",
        denigrates: "",
        comment: "",
    },

    userEvaluationsActiveMonth: "January",
    teamMembers: null,
    userEvaluations: null,
    singleEvaluation: null,

    qualityTeamAverage: null,
    qualityTeamTicketsLength: null,

    qualityEvaluationsActiveCategoryForAgent: "quality",
};

// signin
export const signIn = createAsyncThunk("user-sign-in", async (user, thunkAPI) => {
    try {
        const res = await baseUrl.post("user/signIn", user);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get agent monthly numbers
export const getAgentMonthlyNumbers = createAsyncThunk("get-agent-monthly-numbers", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`user/getAgentMonthlyNumbers/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// do evaluate
export const doEvaluate = createAsyncThunk("do-evaluate", async (data, thunkAPI) => {
    console.log(data);
    try {
        const res = await baseUrl.post("user/doEvaluate", data, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get user evaluations
export const getUserEvaluations = createAsyncThunk("get-user-evaluations", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`user/getUserEvaluations/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get agent operation evaluations
export const getAgentEvaluations = createAsyncThunk("get-agent-evaluations", async (data, thunkAPI) => {
    console.log("getAgentEvaluations");
    try {
        const res = await baseUrl.get(`user/getAgentOperationEvaluations/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get team memebers
export const getTeamMembers = createAsyncThunk("get-team-members", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`user/getTeamMembers`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get single evaluate
export const getSingleEvaluate = createAsyncThunk("get-single-evaluate", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.get(`user/getSingleEvaluate/${data.id}/${data.date}`, {
            headers: {
                authorization: data.token,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// update single evaluate
export const updateEvluation = createAsyncThunk("update-single-evaluate", async (data, thunkAPI) => {
    try {
        const res = await baseUrl.patch(`user/updateSingleEvaluation/${data.id}/${data.date}`, data.ticket, {
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
export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogged = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        updateActiveAgentHistoryMonth: (state, action) => {
            state.activeAgentHistoryMonth = action.payload;
        },
        updateActiveAgentNumbersGraphOption: (state, option) => {
            state.activeAgentNumbersGraphOption = option.payload;
        },
        // evaluations
        updateEvaluationState: (state, { payload }) => {
            for (const property in state.evaluation) {
                for (const property2 in payload) {
                    if (property === property2) {
                        state.evaluation[property] = payload[property];
                    }
                }
            }
        },
        updateActiveUserEvaluationsMonth: (state, action) => {
            state.userEvaluationsActiveMonth = action.payload;
        },
        updateQualityEvaluationsActiveCategoryForAgent: (state, action) => {
            state.qualityEvaluationsActiveCategoryForAgent = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // sign in
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.errorMsg = null;
                state.token = payload.token;
                state.isLogged = true;
                state.user = decodeToken(payload.token);
                localStorage.setItem("token", JSON.stringify(payload.token));
            })

            .addCase(signIn.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMsg = payload.response.data.message;
            })

            //  get user evaluations
            .addCase(getUserEvaluations.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getUserEvaluations.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                if (payload) {
                    state.qualityTeamTicketsLength = payload?.evaluations?.length;
                    let evasTotal = 0;

                    state.userEvaluations = payload.evaluations;
                    payload?.evaluations?.map((eva) => (evasTotal += eva.details.score));
                    state.qualityTeamAverage = evasTotal / state.qualityTeamTicketsLength;
                }
            })

            .addCase(getUserEvaluations.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            //  get agent operation evaluations
            .addCase(getAgentEvaluations.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getAgentEvaluations.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                if (payload) {
                    state.qualityTeamTicketsLength = payload?.evaluations?.length;
                    let evasTotal = 0;

                    state.userEvaluations = payload.evaluations;
                    payload?.evaluations?.map((eva) => (evasTotal += eva.details.score));
                    state.qualityTeamAverage = evasTotal / state.qualityTeamTicketsLength;
                }
            })

            .addCase(getAgentEvaluations.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;

                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            //  get team members
            .addCase(getTeamMembers.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getTeamMembers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                if (payload) {
                    state.teamMembers = payload.teamMembers;
                }
            })

            .addCase(getTeamMembers.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            //  get single evaluate
            .addCase(getSingleEvaluate.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getSingleEvaluate.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.singleEvaluation = payload.ticket;
            })

            .addCase(getSingleEvaluate.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            //  do single evaluate
            .addCase(doEvaluate.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(doEvaluate.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                alert("the evaluation has been added successfuly");
            })

            .addCase(doEvaluate.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            //  update single evaluate
            .addCase(updateEvluation.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateEvluation.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                alert("the evaluation has been updated successfuly");
            })

            .addCase(updateEvluation.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
            })

            // get agent monthly numbers
            .addCase(getAgentMonthlyNumbers.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getAgentMonthlyNumbers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                if (payload) {
                    state.agentMonthlyNumbers = payload.numbers.performance;
                    state.agentNumbersForGraph = payload.numbers.performance.map((number) => {
                        return {
                            date: number.date,
                            Accurate: number.CSAT * 100,
                            Solved: number.KCSAT,
                            QAScore: number.QAScore * 100,
                            IdleTime: number.IdleTime,
                            PMTD: number.PMTD,
                            PPD: number.PPD,
                            PPH: number.PPH,
                            closedCases: number.closedCases,
                            responseRate: number.responseRate,
                            Tickets_Calls: number.surveys,
                        };
                    });
                } else {
                    state.agentMonthlyNumbers = null;
                    state.agentNumbersForGraph = null;
                }
            })

            .addCase(getAgentMonthlyNumbers.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload.response.data.message === "expired token" || payload.response.data.message === "login please" || payload.response.data.message === "user not found") return localStorage.removeItem("token");
                if (payload.response.data.message === "not updated yet") {
                    state.agentMonthlyNumbers = null;
                    state.agentNumbersForGraph = null;
                    return;
                }
                state.isError = true;
            });

        // get user evaluations
    },
});

export const { logout, updateActiveAgentHistoryMonth, updateActiveAgentNumbersGraphOption, updateEvaluationState, checkEaluationInputs, updateActiveUserEvaluationsMonth, updateQualityEvaluationsActiveCategoryForAgent } = userSlice.actions;

export default userSlice.reducer;
