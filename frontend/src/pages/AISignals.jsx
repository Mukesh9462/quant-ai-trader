import { useState } from "react";
import { getRecommendation } from "../services/api";

function AISignals() {
  const [symbol, setSymbol] = useState("AAPL");
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSignal = async () => {
    try {
      setLoading(true);

      const res = await getRecommendation(symbol);

      console.log(res.data);

      setSignal(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load recommendation");
    } finally {
      setLoading(false);
    }
  };

  const getSignalColor = () => {
    if (!signal) return "text-white";

    if (signal.recommendation === "BUY")
      return "text-green-400";

    if (signal.recommendation === "SELL")
      return "text-red-400";

    return "text-yellow-400";
  };

  const getSignalBg = () => {
    if (!signal) return "";

    if (signal.recommendation === "BUY")
      return "border-green-500";

    if (signal.recommendation === "SELL")
      return "border-red-500";

    return "border-yellow-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          AI Trading Signals
        </h1>

        <p className="text-slate-400 mt-3">
          AI powered stock recommendations
        </p>
      </div>

      {/* Search Section */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

        <div className="flex gap-4">

          <input
            value={symbol}
            onChange={(e) =>
              setSymbol(
                e.target.value.toUpperCase()
              )
            }
            placeholder="AAPL"
            className="
              flex-1
              bg-slate-800
              p-4
              rounded-xl
              outline-none
            "
          />

          <button
            onClick={loadSignal}
            className="
              bg-green-600
              hover:bg-green-700
              px-8
              rounded-xl
              font-semibold
              transition-all
            "
          >
            Analyze
          </button>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div
          className="
            bg-slate-900
            rounded-2xl
            p-8
            text-center
          "
        >
          <p className="text-green-400 text-xl">
            Analyzing Stock...
          </p>
        </div>
      )}

      {/* Result */}

      {signal && !loading && (

        <div
          className={`
            bg-slate-900
            border-2
            ${getSignalBg()}
            rounded-3xl
            p-8
            max-w-3xl
          `}
        >

          <div className="flex justify-between items-center mb-8">

            <div>
              <h2 className="text-4xl font-bold">
                {signal.symbol}
              </h2>

              <p className="text-slate-400 mt-2">
                AI Recommendation Report
              </p>
            </div>

            <div
              className={`
                text-3xl
                font-bold
                ${getSignalColor()}
              `}
            >
              {signal.recommendation}
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-800 p-5 rounded-2xl">
              <h3 className="text-slate-400">
                Current Price
              </h3>

              <p className="text-3xl font-bold mt-2">
                ${signal.price}
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-2xl">
              <h3 className="text-slate-400">
                Confidence
              </h3>

              <p className="text-3xl font-bold mt-2">
                {signal.confidence}%
              </p>
            </div>

          </div>

          {/* Confidence Bar */}

          <div className="mt-8">

            <div className="flex justify-between mb-2">
              <span>Confidence Level</span>
              <span>
                {signal.confidence}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-4">

              <div
                className="
                  bg-green-500
                  h-4
                  rounded-full
                "
                style={{
                  width: `${signal.confidence}%`,
                }}
              />

            </div>

          </div>

          {/* Reason */}

          <div className="mt-8 bg-slate-800 p-6 rounded-2xl">

            <h3 className="text-xl font-bold mb-3">
              AI Analysis
            </h3>

            <p className="text-slate-300">
              {signal.reason}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default AISignals;