from alpha_vantage.timeseries import TimeSeries

API_KEY = "AJI81HT2WMMV1ZPA"

ts = TimeSeries(
    key=API_KEY,
    output_format="json"
)


def get_current_price(symbol):
    try:

        data, meta = ts.get_quote_endpoint(
            symbol=symbol
        )

        if "05. price" not in data:
            raise Exception(
                "Alpha Vantage limit reached"
            )

        return float(
            data["05. price"]
        )

    except Exception as e:

        print("PRICE ERROR:", e)

        demo_prices = {
            "AAPL": 291.13,
            "NVDA": 142.50,
            "TSLA": 330.20,
            "MSFT": 510.40,
            "AMZN": 224.10,
            "GOOG": 178.80,
            "META": 742.20,
        }

        return demo_prices.get(
            symbol.upper(),
            100.0
        )


def get_historical_data(symbol):

    try:

        data, meta = ts.get_daily(
            symbol=symbol,
            outputsize="compact"
        )

        chart_data = []

        for date, values in data.items():

            chart_data.append(
                {
                    "date": date,
                    "price": float(
                        values["4. close"]
                    ),
                }
            )

        chart_data.sort(
            key=lambda x: x["date"]
        )

        return chart_data

    except Exception as e:

        print(
            "HISTORICAL ERROR:",
            e
        )

        return [
            {
                "date": "2026-06-01",
                "price": 280,
            },
            {
                "date": "2026-06-02",
                "price": 285,
            },
            {
                "date": "2026-06-03",
                "price": 290,
            },
            {
                "date": "2026-06-04",
                "price": 287,
            },
            {
                "date": "2026-06-05",
                "price": 295,
            },
            {
                "date": "2026-06-06",
                "price": 301,
            },
            {
                "date": "2026-06-07",
                "price": 308,
            },
            {
                "date": "2026-06-08",
                "price": 312,
            },
            {
                "date": "2026-06-09",
                "price": 318,
            },
            {
                "date": "2026-06-10",
                "price": 325,
            },
        ]