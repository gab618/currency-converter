import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";
import api from "./services/api";

function App() {
  const [timeseries, setTimeseries] = useState({});

  useEffect(() => {
    async function getApiData() {
      const response = await api.get(
        "timeseries?start_date=2020-01-01&end_date=2020-01-04&base=BRL"
      );
      console.log(response.data);
      setTimeseries(response.data.rates);
    }
    getApiData();
  }, []);

  const data = [
    { name: "Page A", uv: 10, pv: 20 },
    { name: "Page B", uv: 20, pv: 40 },
    { name: "Page A", uv: 30, pv: 60 },
    { name: "Page A", uv: 5, pv: 10 },
  ];

  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
  );
}

export default App;
