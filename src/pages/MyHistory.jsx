import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgentMonthlyNumbers, updateActiveAgentNumbersGraphOption } from "../features/userSlice";
import Loading from "../components/Loading";
import MyHistoryTable from "../components/MyHistory/MyHistoryTable";
import MyHistoryHeader from "../components/MyHistory/MyHistoryHeader";
import FilterationGraphOptions from "../components/FilterationGraphOptions";
import CommonGraph from "../components/CommonGraph";

export default function MyHistory() {
    const dispatch = useDispatch();
    const { activeAgentHistoryMonth, isLoading, agentNumbersForGraph, activeAgentNumbersGraphOption, agentNumbersGraphOptions, agentMonthlyNumbers } = useSelector((state) => state.userSlice);

    useEffect(() => {
        if (activeAgentHistoryMonth) {
            dispatch(
                getAgentMonthlyNumbers({
                    date: activeAgentHistoryMonth,
                    token: localStorage.getItem("token"),
                })
            );
        }
    }, [activeAgentHistoryMonth, dispatch]);

    return (
        <>
            <MyHistoryHeader />
            {!agentMonthlyNumbers ? (
                <h1>no updated yet</h1>
            ) : isLoading ? (
                <Loading />
            ) : (
                <Wrapper>
                    <FilterationGraphOptions
                        options={agentNumbersGraphOptions}
                        activeOption={activeAgentNumbersGraphOption}
                        updateOption={updateActiveAgentNumbersGraphOption}
                        optionsFor={"my-history"}
                    />
                    <CommonGraph
                        numbers={agentNumbersForGraph}
                        activeOption={activeAgentNumbersGraphOption}
                        graphFor={"my-history"}
                    />
                    <MyHistoryTable />
                </Wrapper>
            )}
        </>
    );
}

const Wrapper = styled.section``;
