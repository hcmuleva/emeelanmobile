import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "8th Pass",
    male: 3000,
    female: 2400,
  },
  {
    name: "12th Pass",
    male: 2500,
    female: 1398,
  },
  {
    name: "Graduates",
    male: 2000,
    female: 9800,
  },
  {
    name: "PostGrad",
    male: 2780,
    female: 3908,
  },
  {
    name: "PHD/Doctor",
    male: 1890,
    female: 4800,
  },
];

export default function EducationMatrix() {
  return (
    <div id="age-chart">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="male"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="female"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </div>
  );
}
