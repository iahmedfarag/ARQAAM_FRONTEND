import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamNumbersPerMonth, updateTeamNumbersGraphActiveOption } from "../features/teamNumbersSlice";
import TeamHistoryHeader from "../components/TeamHistory/TeamHistoryHeader";
import Loading from "../components/Loading";
import TeamHistoryTable from "../components/TeamHistory/TeamHistoryTable";
import FilterationGraphOptions from "../components/FilterationGraphOptions";
import CommonGraph from "../components/CommonGraph";

export default function TeamHistory() {
    const dispatch = useDispatch();
    const { teamNumbersForGraph, activeTeamHistoryMonth, isLoading, teamNumbersGraphActiveOption, teamNumbersGraphOptions, teamNumbersMonthly } = useSelector((state) => state.teamNumbersSlice);
    const { user } = useSelector((state) => state.userSlice);

    useEffect(() => {
        if (activeTeamHistoryMonth) {
            if (user.role === "agent" || user.role === "team-leader") {
                dispatch(
                    getTeamNumbersPerMonth({
                        date: activeTeamHistoryMonth,
                        token: localStorage.getItem("token"),
                    })
                );
            }
            if (user.role === "quality") {
                return;
            }
        }
    }, [activeTeamHistoryMonth, dispatch, user.role]);

    return (
        <>
            <TeamHistoryHeader />
            {!teamNumbersMonthly ? (
                <h1>not updated yet</h1>
            ) : isLoading ? (
                <Loading />
            ) : (
                <>
                    <FilterationGraphOptions
                        options={teamNumbersGraphOptions}
                        activeOption={teamNumbersGraphActiveOption}
                        updateOption={updateTeamNumbersGraphActiveOption}
                        optionsFor={"my-history"}
                    />
                    <CommonGraph
                        numbers={teamNumbersForGraph}
                        activeOption={teamNumbersGraphActiveOption}
                        graphFor={"team-history"}
                    />
                    <TeamHistoryTable />
                </>
            )}
        </>
    );
}
