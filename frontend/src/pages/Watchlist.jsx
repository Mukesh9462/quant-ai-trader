import { useEffect, useState } from "react";

import {
  getWatchlist,
  addWatchlistStock,
  deleteWatchlistStock,
} from "../services/api";

function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");

  const loadWatchlist = async () => {
    try {
      const res = await getWatchlist();

      setStocks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const addStock = async () => {
    if (!symbol) return;

    try {
      await addWatchlistStock({
        symbol,
      });

      setSymbol("");

      loadWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  const removeStock = async (id) => {
    try {
      await deleteWatchlistStock(id);

      loadWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        Watchlist
      </h1>

      <div className="flex gap-4 mb-8">
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
          "
        />

        <button
          onClick={addStock}
          className="
            bg-green-600
            px-5
            py-3
            rounded-lg
          "
        >
          Add Stock
        </button>
      </div>

      <div className="grid gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="
              bg-slate-900
              p-4
              rounded-xl
              flex
              justify-between
              items-center
            "
          >
            <h2 className="text-xl font-bold">
              {stock.symbol}
            </h2>

            <button
              onClick={() =>
                removeStock(stock.id)
              }
              className="
                bg-red-600
                px-4
                py-2
                rounded-lg
              "
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;