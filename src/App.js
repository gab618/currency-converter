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
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    async function getApiData() {
      const response = await api.get(
        "timeseries?start_date=2020-11-07&end_date=2020-12-07&base=USD"
      );

      const formattedData = [];

      for (const day in response.data.rates) {
        console.log(day);
        formattedData.push({ day, value: response.data.rates[day] });
      }
      console.log(formattedData);
      setTimeseries(formattedData);
    }
    getApiData();
  }, []);

  const data = [
    { day: "2020-01-01", value: 0.249173 },
    { day: "2020-01-02", value: 0.250006 },
    { day: "2020-01-03", value: 0.248687 },
    { day: "2020-01-04", value: 0.248687 },
  ];

  return (
    <LineChart width={800} height={500} data={timeseries}>
      <XAxis dataKey="day" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value.BRL"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

export default App;
