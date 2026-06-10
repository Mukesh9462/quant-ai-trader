import { useState, useEffect } from "react";
import API from "../services/api";

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
      <h1 className="text-4xl font-bold mb-8">
        Trade Simulator
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <input
          value={symbol}
          onChange={(e) =>
            setSymbol(e.target.value.toUpperCase())
          }
          className="bg-slate-700 p-3 rounded mr-4"
          placeholder="Symbol"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          className="bg-slate-700 p-3 rounded mr-4"
        />

        <button
          onClick={buyStock}
          className="bg-green-600 px-5 py-3 rounded mr-4"
        >
          BUY
        </button>

        <button
          onClick={sellStock}
          className="bg-red-600 px-5 py-3 rounded"
        >
          SELL
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-2xl mb-4">
          Trade History
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.id}</td>
                <td>{trade.symbol}</td>
                <td>{trade.trade_type}</td>
                <td>{trade.quantity}</td>
                <td>{trade.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trade;