import { useEffect, useState } from "react";

import {
  getPortfolioPerformance,
  getPortfolioSummary,
  addStock,
  deleteStock,
} from "../services/api";

function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [summary, setSummary] = useState(null);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const perf = await getPortfolioPerformance();
      const sum = await getPortfolioSummary();

      setStocks(perf.data);
      setSummary(sum.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      await addStock({
        symbol: symbol.toUpperCase(),
        quantity: Number(quantity),
        buy_price: Number(buyPrice),
      });

      setSymbol("");
      setQuantity("");
      setBuyPrice("");

      loadPortfolio();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      loadPortfolio();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Portfolio Dashboard
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl mb-4">
          Add Stock
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-slate-700 p-3 rounded"
          />

          <input
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-slate-700 p-3 rounded"
          />

          <input
            placeholder="Buy Price"
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="bg-slate-700 p-3 rounded"
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 rounded p-3"
          >
            Add Stock
          </button>
        </div>
      </div>

      {summary && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-xl">
            <h3>Total Investment</h3>
            <p className="text-2xl mt-2">
              ₹ {summary.total_investment}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <h3>Current Value</h3>
            <p className="text-2xl mt-2">
              ₹ {summary.current_value}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <h3>Total Profit/Loss</h3>
            <p className="text-2xl mt-2">
              ₹ {summary.total_profit_loss}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <h3>Return %</h3>
            <p className="text-2xl mt-2">
              {summary.total_profit_percent}%
            </p>
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl mb-4">
          Holdings
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="p-3">Symbol</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Buy Price</th>
              <th className="p-3">Current Price</th>
              <th className="p-3">P/L</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((stock, index) => (
              <tr
                key={index}
                className="border-b border-slate-700"
              >
                <td className="p-3">{stock.symbol}</td>
                <td className="p-3">{stock.quantity}</td>
                <td className="p-3">{stock.buy_price}</td>
                <td className="p-3">{stock.current_price}</td>
                <td className="p-3">{stock.profit_loss}</td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDelete(stock.id)
                    }
                    className="bg-red-600 px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;