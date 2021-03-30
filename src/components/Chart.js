import React, {useEffect, useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Title from './Title';
import {CircularProgress} from '@material-ui/core';

export default function Chart(props) {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.stats) {
      setData(props.stats);
    }
  }, [props.stats]);
  return (
    <>
      <Title>Positive cases registered in the last 14 days</Title>
      <ResponsiveContainer>
        {props.loading ?? false ? (
          <CircularProgress />
        ) : (
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}>
            <Tooltip />
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                }}>
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
        )}
      </ResponsiveContainer>
    </>
  );
}
