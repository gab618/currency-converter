import { subMonths } from "date-fns/esm";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
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

import "./styles/app.css";

function App() {
  const [timeseries, setTimeseries] = useState([]);
  const [base, setBase] = useState("USD");
  const [compared, setCompared] = useState("BRL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { width, height } = useWindowSize();

  const options = [
    "USD",
    "JPY",
    "BGN",
    "CZK",
    "DKK",
    "GBP",
    "HUF",
    "PLN",
    "RON",
    "SEK",
    "CHF",
    "ISK",
    "NOK",
    "HRK",
    "RUB",
    "TRY",
    "AUD",
    "BRL",
    "CAD",
    "CNY",
    "HKD",
    "IDR",
    "ILS",
    "INR",
    "KRW",
    "MXN",
    "MYR",
    "NZD",
    "PHP",
    "SGD",
    "THB",
    "ZAR",
    "EUR",
    "AED",
    "AFN",
    "ALL",
    "ARS",
    "BAM",
    "BBD",
    "BDT",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BSD",
    "BWP",
    "BZD",
    "CLP",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "DJF",
    "DOP",
    "DZD",
    "EGP",
    "ETB",
    "FJD",
    "GHS",
    "GNF",
    "GTQ",
    "HNL",
    "HTG",
    "IQD",
    "JMD",
    "JOD",
    "KES",
    "KHR",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MOP",
    "MUR",
    "MVR",
    "MWK",
    "NAD",
    "NGN",
    "NIO",
    "NPR",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PKR",
    "PYG",
    "QAR",
    "RSD",
    "RWF",
    "SAR",
    "SCR",
    "SDG",
    "SOS",
    "SVC",
    "SZL",
    "TND",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VND",
    "XAF",
    "XOF",
    "XPF",
    "ZMW",
  ];

  useEffect(() => {
    const initialDate = new Date();
    const pastDate = subMonths(initialDate, 1);
    setEndDate(initialDate.toISOString().slice(0, 10));
    setStartDate(pastDate.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    async function getApiData() {
      const response = await api.get(
        `timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}`
      );

      const formattedData = [];

      for (const day in response.data.rates) {
        formattedData.push({ day, value: response.data.rates[day] });
      }
      console.log(formattedData);
      setTimeseries(formattedData);
    }
    getApiData();
  }, [base, endDate, startDate]);

  function handleSelectBase(e) {
    setBase(e.target.value);
  }
  function handleSelectCompared(e) {
    setCompared(e.target.value);
  }

  return (
    <div className="container">
      <h2>Currency Converter Chart</h2>
      <LineChart
        width={width - width / 10}
        height={height - height / 5}
        data={timeseries}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 16,
        }}
      >
        <XAxis dataKey="day" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          name={compared}
          type="monotone"
          dataKey={`value.${compared}`}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <div className="select-container">
        <select name="base" id="base" onChange={handleSelectBase}>
          {options.map((option) => (
            <option key={`b-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="compared" id="compared" onChange={handleSelectCompared}>
          {options.map((option) => (
            <option key={`c-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
