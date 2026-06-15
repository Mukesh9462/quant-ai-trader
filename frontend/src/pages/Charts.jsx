import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  getHistoricalData,
} from "../services/api";

function Charts() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);

  const loadChart = async () => {
    try {
      const res = await getHistoricalData(symbol);

      console.log("FULL RESPONSE:");
      console.log(res);

      console.log("DATA:");
      console.log(res.data);

      console.log("CHART ARRAY:");
      console.log(res.data.data);

      const chartData =
        res.data.data || [];

      alert(
        "Records from API: " +
        chartData.length
      );

      console.log(
        "SETTING DATA:",
        chartData
      );

      setData(chartData);

    } catch (err) {
      console.error(
        "CHART ERROR:"
      );
      console.error(err);

      alert(
        "Chart API Error. Check Console."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Stock Charts
      </h1>

      <div className="flex gap-4 mb-4">

        <input
          value={symbol}
          onChange={(e) =>
            setSymbol(
              e.target.value.toUpperCase()
            )
          }
          placeholder="AAPL"
          className="
            bg-slate-800
            p-3
            rounded-lg
            text-white
          "
        />

        <button
          onClick={loadChart}
          className="
            bg-green-600
            hover:bg-green-700
            px-5
            py-3
            rounded-lg
            font-semibold
          "
        >
          Load Chart
        </button>

      </div>

      <p className="mb-6 text-green-400 font-semibold">
        Records Loaded: {data.length}
      </p>

      <div className="bg-slate-900 p-6 rounded-2xl">

        {data.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={500}
          >

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        ) : (

          <div
            className="
              h-[500px]
              flex
              items-center
              justify-center
              text-slate-400
              text-xl
            "
          >
            Click "Load Chart" to fetch data
          </div>

        )}

      </div>

    </div>
  );
}

export default Charts;