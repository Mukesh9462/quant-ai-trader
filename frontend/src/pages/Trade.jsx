import { useState, useEffect } from "react";
import API from "../services/api";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function Trade() {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);
  const [trades, setTrades] = useState([]);

  const loadTrades = async () => {
    try {
      const res = await API.get("/trade/");
      setTrades(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTrades();
  }, []);

  const buyStock = async () => {
    try {
      await API.post("/trade/buy", {
        symbol,
        quantity,
      });

      loadTrades();
    } catch (err) {
      console.error(err);
    }
  };

  const sellStock = async () => {
    try {
      await API.post("/trade/sell", {
        symbol,
        quantity,
      });

      loadTrades();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Trading Terminal
        </h1>

        <p className="text-slate-400 mt-3">
          Execute trades with AI-powered insights.
        </p>
      </div>

      {/* TOP CARDS */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400">
            Today's Signals
          </p>

          <h2 className="text-3xl font-bold mt-2">
            24
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400">
            Buy Signals
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            17
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400">
            Sell Signals
          </p>

          <h2 className="text-3xl font-bold text-red-400 mt-2">
            7
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400">
            Win Rate
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            73%
          </h2>
        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}

        <div className="lg:col-span-2">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Execute Trade
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                value={symbol}
                onChange={(e) =>
                  setSymbol(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Stock Symbol"
                className="
                  bg-slate-800
                  p-4
                  rounded-xl
                  border
                  border-slate-700
                "
              />

              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Number(e.target.value)
                  )
                }
                placeholder="Quantity"
                className="
                  bg-slate-800
                  p-4
                  rounded-xl
                  border
                  border-slate-700
                "
              />

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={buyStock}
                className="
                  flex-1
                  bg-green-600
                  hover:bg-green-700
                  py-4
                  rounded-xl
                  font-bold
                  flex
                  justify-center
                  items-center
                  gap-3
                "
              >
                <FaArrowUp />
                BUY
              </button>

              <button
                onClick={sellStock}
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  py-4
                  rounded-xl
                  font-bold
                  flex
                  justify-center
                  items-center
                  gap-3
                "
              >
                <FaArrowDown />
                SELL
              </button>

            </div>

          </div>

        </div>

        {/* AI PANEL */}

        <div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <FaRobot className="text-green-400 text-3xl" />

              <h2 className="text-2xl font-bold">
                AI Recommendation
              </h2>

            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">

              <p className="text-green-400 text-lg font-bold">
                BUY NVDA
              </p>

              <p className="text-slate-300 mt-3">
                Confidence: 87%
              </p>

              <p className="text-slate-300">
                Risk Level: Medium
              </p>

              <p className="text-slate-300">
                Target: $180
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* TRADE HISTORY */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

        <div className="flex items-center gap-3 mb-6">

          <FaChartLine className="text-green-400" />

          <h2 className="text-3xl font-bold">
            Trade History
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Symbol
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

              </tr>

            </thead>

            <tbody>

              {trades.map((trade) => (

                <tr
                  key={trade.id}
                  className="border-b border-slate-800"
                >

                  <td className="p-4">
                    {trade.id}
                  </td>

                  <td className="p-4 font-bold">
                    {trade.symbol}
                  </td>

                  <td
                    className={`p-4 font-bold ${
                      trade.trade_type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.trade_type}
                  </td>

                  <td className="p-4">
                    {trade.quantity}
                  </td>

                  <td className="p-4">
                    ${trade.price}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Trade;