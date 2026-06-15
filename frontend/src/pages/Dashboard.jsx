import {
  FaRobot,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

import {
  FaArrowTrendUp,
  FaBitcoin,
} from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full"></div>

      {/* HERO */}

      <section className="px-8 py-20 text-center relative z-10">

        <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          AI Signals Live
        </div>

        <h1 className="text-6xl font-bold mt-8">
          Trade Smarter with
          <span className="text-green-500">
            {" "}AI
          </span>
        </h1>

        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          Quant AI Trader analyzes stocks,
          market sentiment and technical indicators
          in real time to generate powerful
          AI trading signals.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            className="
              bg-green-600
              hover:bg-green-700
              px-6
              py-3
              rounded-lg
              font-semibold
            "
          >
            Start Trading
          </button>

          <button
            className="
              border
              border-slate-700
              px-6
              py-3
              rounded-lg
            "
          >
            Watch Demo
          </button>
        </div>

      </section>

      {/* STATS */}

      <section
        className="
          grid
          md:grid-cols-4
          gap-6
          px-8
          pb-16
          relative
          z-10
        "
      >

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400">
            Total Signals
          </h3>

          <p className="text-3xl font-bold mt-2">
            2,847
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400">
            Win Rate
          </h3>

          <p className="text-3xl font-bold mt-2 text-green-500">
            73%
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400">
            Avg Return
          </h3>

          <p className="text-3xl font-bold mt-2">
            +4.2%
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400">
            Assets Monitored
          </h3>

          <p className="text-3xl font-bold mt-2">
            12,400+
          </p>
        </div>

      </section>

      {/* MARKET OVERVIEW */}

      <section className="px-8 pb-20 relative z-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Market Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <FaArrowTrendUp className="text-green-500 text-3xl" />

            <h3 className="mt-4 text-xl font-bold">
              NIFTY 50
            </h3>

            <p className="text-3xl font-bold mt-2">
              24,850
            </p>

            <p className="text-green-500">
              +0.82%
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <FaArrowTrendUp className="text-green-500 text-3xl" />

            <h3 className="mt-4 text-xl font-bold">
              SENSEX
            </h3>

            <p className="text-3xl font-bold mt-2">
              81,200
            </p>

            <p className="text-green-500">
              +0.61%
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <FaChartLine className="text-green-500 text-3xl" />

            <h3 className="mt-4 text-xl font-bold">
              NASDAQ
            </h3>

            <p className="text-3xl font-bold mt-2">
              21,500
            </p>

            <p className="text-green-500">
              +1.14%
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <FaBitcoin className="text-yellow-500 text-3xl" />

            <h3 className="mt-4 text-xl font-bold">
              BTC/USD
            </h3>

            <p className="text-3xl font-bold mt-2">
              $108,000
            </p>

            <p className="text-green-500">
              +3.25%
            </p>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="px-8 pb-20 relative z-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Quant AI Trader?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <FaRobot
              size={40}
              className="text-green-500"
            />

            <h3 className="text-2xl font-bold mt-4">
              AI Powered
            </h3>

            <p className="text-slate-400 mt-3">
              Deep learning models analyze
              thousands of stocks every minute.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <FaChartLine
              size={40}
              className="text-green-500"
            />

            <h3 className="text-2xl font-bold mt-4">
              Real-Time Signals
            </h3>

            <p className="text-slate-400 mt-3">
              Receive buy, sell and hold
              recommendations instantly.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <FaShieldAlt
              size={40}
              className="text-green-500"
            />

            <h3 className="text-2xl font-bold mt-4">
              Risk Management
            </h3>

            <p className="text-slate-400 mt-3">
              Smart stop-loss and portfolio
              protection strategies.
            </p>
          </div>

        </div>

      </section>

      {/* AI PICKS */}

      <section className="px-8 pb-20 relative z-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Top AI Picks Today
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-green-500/20 p-6 rounded-xl">
            <h3 className="text-2xl font-bold">
              NVDA
            </h3>

            <p className="text-green-500 mt-2">
              Strong Buy
            </p>

            <p className="text-slate-400 mt-4">
              Confidence Score:
              <span className="text-white"> 92%</span>
            </p>
          </div>

          <div className="bg-slate-900 border border-green-500/20 p-6 rounded-xl">
            <h3 className="text-2xl font-bold">
              AAPL
            </h3>

            <p className="text-green-500 mt-2">
              Buy
            </p>

            <p className="text-slate-400 mt-4">
              Confidence Score:
              <span className="text-white"> 88%</span>
            </p>
          </div>

          <div className="bg-slate-900 border border-yellow-500/20 p-6 rounded-xl">
            <h3 className="text-2xl font-bold">
              TSLA
            </h3>

            <p className="text-yellow-500 mt-2">
              Hold
            </p>

            <p className="text-slate-400 mt-4">
              Confidence Score:
              <span className="text-white"> 79%</span>
            </p>
          </div>

        </div>

      </section>

      <footer className="border-t border-slate-800 py-10 text-center text-slate-500 relative z-10">

        <p>
          © 2026 Quant AI Trader
        </p>

        <p className="mt-2">
          AI Powered Trading Intelligence
        </p>

      </footer>

    </div>
  );
}

export default Dashboard;
