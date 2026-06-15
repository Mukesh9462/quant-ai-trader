import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  getPortfolioAllocation,
  getPortfolioPerformance,
} from "../services/api";

const COLORS = [
  "#14d6a0",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f43f5e",
  "#22c55e",
];

function PortfolioCharts() {
  const [allocationData, setAllocationData] =
    useState([]);

  const [performanceData, setPerformanceData] =
    useState([]);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const allocation =
        await getPortfolioAllocation();

      console.log(
        "ALLOCATION:",
        allocation.data
      );

      setAllocationData(
        allocation.data || []
      );

      const performance =
        await getPortfolioPerformance();

      console.log(
        "PERFORMANCE:",
        performance.data
      );

      const chartData =
        performance.data.map(
          (stock) => ({
            symbol: stock.symbol,
            value: stock.current_value,
          })
        );

      setPerformanceData(chartData);

    } catch (error) {
      console.error(
        "CHART ERROR:",
        error
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      {/* Portfolio Growth */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Portfolio Value
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart
            data={performanceData}
          >
            <CartesianGrid
              stroke="#1e293b"
            />

            <XAxis
              dataKey="symbol"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#14d6a0"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Asset Allocation */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Asset Allocation
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {allocationData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PortfolioCharts;