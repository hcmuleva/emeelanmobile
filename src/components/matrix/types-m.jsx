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

export default function TypesMatrix() {
  const {
    userMeelanData: { maritalstatuscount },
  } = useContext(MeelanContext);
  const types = Object.keys(maritalstatuscount);
  const data = types.map((type) => ({
    name: type,
    male: maritalstatuscount[type]["Male"].count,
    female: maritalstatuscount[type]["Female"].count,
  }));

  return (
    <div id="age-chart">
      <BarChart
        width={500}
        height={300}
        title="Hello World!"
        data={data}
        margin={{
          top: 4,
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
