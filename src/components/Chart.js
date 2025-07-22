import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Chart({ data }) {
  return (
    <LineChart width={800} height={400} data={data}>
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" dataKey="co2" stroke="#8884d8" />
    </LineChart>
  );
}

export default Chart;
