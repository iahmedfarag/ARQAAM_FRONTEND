import Layout from "./pages/Layout";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TeamHistory from "./pages/TeamHistory";
import Login from "./pages/Login";
import MyHistory from "./pages/MyHistory";
import Evaluate from "./pages/Evaluate";
import Evaluations from "./pages/Evaluations";
import EvaluationDetails from "./pages/EvaluationDetails";
import UpdateEvaluation from "./pages/updateEvaluation";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    // path: "/:teamID/:date",
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/team-history",
                    element: <TeamHistory />,
                },
                {
                    path: "/my-history",
                    element: <MyHistory />,
                },
                {
                    path: "/evaluate",
                    element: <Evaluate />,
                },
                {
                    path: "/evaluations",
                    element: <Evaluations />,
                },
                {
                    path: "/evaluations/:id/:date",
                    element: <EvaluationDetails />,
                },
                {
                    path: "/updateEvaluation/:id/:date",
                    element: <UpdateEvaluation />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "*",
                    element: (
                        <>
                            <h2>I think you got lost</h2>
                            <Link to={"/"}>get back home</Link>
                        </>
                    ),
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
