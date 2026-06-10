import { useState } from "react";
import { getNews } from "../services/api";

function News() {
  const [symbol, setSymbol] = useState("AAPL");
  const [news, setNews] = useState([]);

  const loadNews = async () => {
    try {
      const res = await getNews(symbol);

      console.log("NEWS RESPONSE:", res.data);

      setNews(res.data.news || []);
    } catch (error) {
      console.error("NEWS ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Market News
      </h1>

      <div className="flex gap-4 mb-8">
        <input
          value={symbol}
          onChange={(e) =>
            setSymbol(e.target.value.toUpperCase())
          }
          placeholder="Enter stock symbol"
          className="
            bg-slate-800
            p-3
            rounded-lg
            text-white
            w-64
          "
        />

        <button
          onClick={loadNews}
          className="
            bg-green-600
            hover:bg-green-700
            px-5
            py-3
            rounded-lg
          "
        >
          Load News
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Total News Articles: {news.length}
        </h2>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="
              bg-slate-800
              p-4
              rounded-xl
            "
          >
            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="mt-2">
              Sentiment:{" "}
              <span className="font-bold">
                {item.sentiment}
              </span>
            </p>
          </div>
        ))}

        {news.length === 0 && (
          <div className="bg-slate-800 p-4 rounded-xl">
            No news loaded yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default News;