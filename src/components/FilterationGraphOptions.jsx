/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function FilterationGraphOptions({
  options,
  activeOption,
  optionsFor,
  updateOption,
}) {
  const dispatch = useDispatch();

  return (
    <Wrapper className="options" style={{ marginBottom: "20px" }}>
      {options?.map((option, index) => {
        let active = option === activeOption ? true : false;
        return (
          <Button
            variant="contained"
            key={index}
            style={{
              backgroundColor: active ? "#3EEDBF" : "#2196f3",
              color: active ? "#000" : "#fff",
            }}
            onClick={() => dispatch(updateOption(option))}
          >
            {option}
          </Button>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;
