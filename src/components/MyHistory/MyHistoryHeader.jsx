import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { updateActiveAgentHistoryMonth } from "../../features/userSlice";

export default function MyHistoryHeader() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(dayjs());

  useEffect(() => {
    dispatch(updateActiveAgentHistoryMonth(dayjs(value).format()));
  }, [dispatch, value]);

  return (
    <Wrapper>
      <h2 className="chossen-date">{value.format("MMMM")}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Pick a date"
              value={value}
              views={["month"]}
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
