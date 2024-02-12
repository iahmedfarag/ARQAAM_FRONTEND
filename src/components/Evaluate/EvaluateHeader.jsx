import { Button } from "@mui/material";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function EvaluateHeader({ ticketDetails }) {
    const { isLoading } = useSelector((state) => state.userSlice);

    return (
        <header style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Evaluate</h2>
            {ticketDetails ? (
                <Button
                    type="submit"
                    variant="contained"
                    style={{ fontSize: "18px" }}
                    disabled={isLoading}>
                    {isLoading ? "loading..." : "Edit"}
                </Button>
            ) : (
                <Button
                    type="submit"
                    variant="contained"
                    style={{ fontSize: "18px" }}
                    disabled={isLoading}>
                    {isLoading ? "loading..." : "Submit"}
                </Button>
            )}
        </header>
    );
}
