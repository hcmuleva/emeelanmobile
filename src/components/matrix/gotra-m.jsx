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

export default function Gotra() {
  const {
    userMeelanData: { gotracount },
  } = useContext(MeelanContext);
  const gotras = Object.keys(gotracount);
  const data = gotras?.map((gotra) => {
    return {
      name: gotra,
      male: gotracount[gotra]["Male"].count,
      female: gotracount[gotra]["Female"].count,
    };
  });

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
