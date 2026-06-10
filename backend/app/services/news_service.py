import feedparser


def get_stock_news(symbol: str):

    try:

        url = (
            f"https://news.google.com/rss/search?"
            f"q={symbol}+stock"
        )

        feed = feedparser.parse(url)

        news = []

        for entry in feed.entries[:10]:

            title = entry.title

            sentiment = "Neutral"

            positive_words = [
                "gain",
                "growth",
                "profit",
                "beat",
                "surge",
                "bullish",
                "upgrade"
            ]

            negative_words = [
                "loss",
                "drop",
                "fall",
                "bearish",
                "downgrade",
                "lawsuit"
            ]

            title_lower = title.lower()

            if any(
                word in title_lower
                for word in positive_words
            ):
                sentiment = "Positive"

            elif any(
                word in title_lower
                for word in negative_words
            ):
                sentiment = "Negative"

            news.append(
                {
                    "title": title,
                    "sentiment": sentiment
                }
            )

        return news

    except Exception as e:

        return [
            {
                "error": str(e)
            }
        ]