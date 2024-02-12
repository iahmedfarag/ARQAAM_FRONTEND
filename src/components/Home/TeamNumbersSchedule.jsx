import { useSelector } from "react-redux";
import CommonTable from "../CommonTable";
import Loading from "../Loading";

export default function TeamNumbersSchedule() {
    const { isLoading, teamNumbersDaily, total } = useSelector((state) => state.teamNumbersSlice);

    if (isLoading) {
        return <Loading />;
    }

    if (!teamNumbersDaily || !total) {
        return <h2 style={{ marginTop: "50px", textAlign: "center" }}>not updated yet</h2>;
    }

    return (
        <CommonTable
            numbers={teamNumbersDaily}
            total={total}
            tableFor={"team-numbers-schedule"}
        />
    );
}
