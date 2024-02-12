import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UploadBTN from "./UploadBTN";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeamNumbersPerDay,
  updateActiveDate,
} from "../../features/teamNumbersSlice";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const [value, setValue] = useState(dayjs());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveDate(dayjs(value).format()));
    if (user.role === "agent" || user.role === "team-leader") {
      dispatch(
        getTeamNumbersPerDay({
          date: dayjs(value).format(),
          token: localStorage.getItem("token"),
        })
      );
    }
    if (user.role === "quality") {
      return;
    }
  }, [dispatch, user.role, value]);

  return (
    <Wrapper>
      <h2 className="chossen-date">{value.format("DD-MM-YYYY")}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {user.role === "team-leader" ? <UploadBTN /> : ""}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Pick a date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid #3eedbf;
  padding-bottom: 20px;
`;
