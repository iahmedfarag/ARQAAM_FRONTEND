/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";

export default function CommonGraph({ numbers, activeOption, graphFor }) {
    return (
        <Wrapper>
            <ResponsiveContainer
                width={"100%"}
                height={200}
                className={"graphContainer"}>
                <AreaChart
                    width={500}
                    height={400}
                    data={numbers}
                    margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis
                        // domain={[0, 100]}
                        tickCount={6}
                        allowDecimals={false}
                        allowDataOverflow={true}
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey={activeOption}
                        stroke="#3EEDBF"
                        fill="#8884d8"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    margin-top: 15px;
    .graphContainer {
        margin-left: -10px;
    }
`;
