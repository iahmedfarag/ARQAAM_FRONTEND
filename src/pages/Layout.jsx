import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const { isLogged, isTokenExpired } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!isLogged || isTokenExpired || !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLogged, isTokenExpired, navigate]);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <div className="padding" style={{ padding: "20px" }}></div>
    </>
  );
}
