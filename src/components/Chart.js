import React from "react";
import {useTheme} from "@material-ui/core/styles";
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis,} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
    return {time, amount};
}

const data = [
    createData("Mon", 300),
    createData("Tue", 234),
    createData("Wed", 500),
    createData("Thu", 123),
    createData("Fri", 567),
    createData("Sat", 918),
    createData("Sun", 653),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Daily Cases 7 days</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: "middle", fill: theme.palette.text.primary}}
                        >
                            Positive Cases
                        </Label>
                    </YAxis>
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
