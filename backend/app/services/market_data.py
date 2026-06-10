import yfinance as yf


def get_current_price(symbol: str):

    try:
        stock = yf.Ticker(symbol)

        data = stock.history(period="1d")

        if data.empty:
            return 0

        return round(
            float(data["Close"].iloc[-1]),
            2
        )

    except Exception:
        return 0


def get_stock_info(symbol: str):

    try:
        stock = yf.Ticker(symbol.upper())

        info = stock.info

        return {
            "symbol": symbol.upper(),
            "name": info.get("longName"),
            "current_price": info.get("currentPrice"),
            "currency": info.get("currency"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "market_cap": info.get("marketCap"),
            "country": info.get("country"),
            "website": info.get("website")
        }

    except Exception as e:
        return {
            "error": "Stock not found",
            "details": str(e)
        }