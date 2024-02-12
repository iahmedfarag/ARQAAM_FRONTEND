import { useSelector } from "react-redux";
import Header from "../components/Home/Header";
import SubHeader from "../components/Home/SubHeader";
import TeamNumbersSchedule from "../components/Home/TeamNumbersSchedule";
import Evaluations from "./Evaluations";

export default function Home() {
    const { isLogged, user } = useSelector((state) => state.userSlice);

    if (isLogged) {
        return (
            <>
                {user.role === "quality" ? (
                    <>
                        <Evaluations />
                    </>
                ) : (
                    <>
                        <Header />
                        <SubHeader />
                        <TeamNumbersSchedule />
                    </>
                )}
            </>
        );
    }
}
