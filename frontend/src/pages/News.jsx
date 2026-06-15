import { useState } from "react";
import { getNews } from "../services/api";

function News() {
  const [symbol, setSymbol] = useState("AAPL");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNews = async () => {
    try {
      setLoading(true);

      const res = await getNews(symbol);

      console.log("NEWS RESPONSE:", res.data);

      setNews(res.data.news || []);
    } catch (error) {
      console.error("NEWS ERROR:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          AI News Sentiment
        </h1>

        <p className="text-slate-400 mt-3">
          Analyze stock market news using AI
          sentiment detection.
        </p>
      </div>

      {/* Search */}

      <div className="bg-slate-900 p-6 rounded-2xl mb-8 border border-slate-800">
        <div className="flex gap-4">
          <input
            value={symbol}
            onChange={(e) =>
              setSymbol(
                e.target.value.toUpperCase()
              )
            }
            placeholder="Enter Stock Symbol"
            className="
              flex-1
              bg-slate-800
              p-4
              rounded-xl
              border
              border-slate-700
              outline-none
            "
          />

          <button
            onClick={loadNews}
            className="
              bg-green-600
              hover:bg-green-700
              px-8
              rounded-xl
              font-bold
            "
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Symbol
          </h3>

          <p className="text-3xl font-bold mt-2">
            {symbol}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Articles
          </h3>

          <p className="text-3xl font-bold mt-2">
            {news.length}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Status
          </h3>

          <p className="text-3xl font-bold mt-2 text-green-400">
            AI Ready
          </p>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          Loading news...
        </div>
      )}

      {/* News Cards */}

      {!loading && (
        <div className="space-y-5">
          {news.map((item, index) => (
            <div
              key={index}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
              "
            >
              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <div className="mt-4 flex gap-4">
                <span
                  className={`
                    px-4
                    py-2
                    rounded-full
                    font-semibold
                    ${
                      item.sentiment ===
                      "Bullish"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {item.sentiment}
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  {symbol}
                </span>
              </div>
            </div>
          ))}

          {news.length === 0 && (
            <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
              <h2 className="text-2xl font-bold">
                No News Loaded
              </h2>

              <p className="text-slate-400 mt-3">
                Enter a stock symbol and click
                Analyze.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default News;