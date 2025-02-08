import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

const MiniChart = ({ data, color }: { data: { close: string }[], color: string }) => {
  const transformedData = data.map(entry => ({
    price: parseFloat(entry.close)
  }));

  return (
    <ResponsiveContainer  height={35} width={"70%"}>
      <LineChart data={transformedData}>
        <XAxis dataKey="date" hide />
        <YAxis domain={["auto", "auto"]} hide />
        <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
