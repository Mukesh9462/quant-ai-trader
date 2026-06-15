import { useEffect, useState } from "react";
import { getCurrentPrice } from "../services/api";

function MarketTicker() {
  const symbols = [
    "AAPL",
    "NVDA",
    "TSLA",
    "GOOG",
    "META",
    "MSFT",
    "AMZN",
  ];

  const [stocks, setStocks] = useState([]);

  const loadPrices = async () => {
    try {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const res =
            await getCurrentPrice(symbol);

          return {
            symbol,
            price: res.data.price,
          };
        })
      );

      setStocks(results);
    } catch (error) {
      console.error(
        "MARKET TICKER ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    loadPrices();

    const interval = setInterval(
      loadPrices,
      30000
    );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div
      className="
        bg-black/30
        backdrop-blur-xl
        border-b
        border-slate-800
        overflow-hidden
      "
    >
      <div
        className="
          flex
          items-center
          gap-8
          px-8
          py-3
          overflow-x-auto
        "
      >
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="
              flex
              items-center
              gap-3
              bg-slate-900/70
              border
              border-slate-800
              px-4
              py-2
              rounded-xl
              min-w-fit
              hover:border-green-500/50
              hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]
              transition-all
            "
          >
            <span
              className="
                font-bold
                text-white
              "
            >
              {stock.symbol}
            </span>

            <span
              className="
                text-slate-300
              "
            >
              $
              {Number(
                stock.price
              ).toFixed(2)}
            </span>

            <span
              className="
                text-green-400
                font-semibold
              "
            >
              LIVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketTicker;