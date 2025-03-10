import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface CustomizedDotProps {
  cx?: number;
  cy?: number;
  stroke?: string;
  value?: number;
  mean: number;
  stdDev: number;
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function mean(arr: number[]): number {
  return arr.reduce((acc, item) => acc + item) / arr.length;
}

function standardDeviation(mean: number, arr: number[]): number {
  let squaredDiffs = arr.map((x) => Math.pow(x - mean, 2));
  let variance = squaredDiffs.reduce((acc, b) => acc + b) / arr.length;
  return Math.sqrt(variance);
}

function zScore(x: number, mean: number, standartDeviation: number): number {
  return (x - mean) / standartDeviation;
}

const uvValues = data.map((d) => d.uv);
const pvValues = data.map((d) => d.pv);

const uvMean = mean(uvValues);
const pvMean = mean(pvValues);

const uvStdDev = standardDeviation(uvMean, uvValues);
const pvStdDev = standardDeviation(pvMean, pvValues);

const CustomizedDot = (props: CustomizedDotProps) => {
  const { stroke, value, mean, stdDev } = props;
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={4}
      fill={value && zScore(value, mean, stdDev) >= 1 ? "red" : stroke}
    />
  );
};

export default function App() {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={<CustomizedDot mean={pvMean} stdDev={pvStdDev} />}
        ></Line>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          dot={<CustomizedDot mean={uvMean} stdDev={uvStdDev} />}
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
