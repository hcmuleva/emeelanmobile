import { MeelanContext } from "../../contexts/meelan-contex";
import { useContext } from "react";
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

export default function AgeMatrix() {
  const {
    userMeelanData: { ageGroups },
  } = useContext(MeelanContext);
  const ages = Object.keys(ageGroups);
  const data = ages.map((age) => ({
    name: `age ${age}`,
    male: ageGroups[age]["Male"].count,
    female: ageGroups[age]["Female"].count,
  }));

  return (
    <div id="age-chart">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
          fill="#91DDCF"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="female"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </div>
  );
}
