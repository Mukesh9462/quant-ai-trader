from fastapi import APIRouter
import yfinance as yf

from app.services.market_data import get_stock_info
from app.services.ai_recommendation import get_recommendation
from app.services.news_service import get_stock_news
from app.services.ai_score import calculate_stock_score

router = APIRouter()


@router.get("/search/{symbol}")
def search_stock(symbol: str):

    stock = get_stock_info(symbol)

    if "error" in stock:
        return stock

    return stock


@router.get("/recommendation/{symbol}")
def stock_recommendation(symbol: str):

    stock = get_stock_info(symbol)

    if "error" in stock:
        return stock

    ai_result = get_recommendation(
        symbol,
        stock["current_price"]
    )

    return {
        "symbol": symbol.upper(),
        "current_price": stock["current_price"],
        "recommendation": ai_result["recommendation"],
        "confidence": ai_result["confidence"],
        "reason": ai_result["reason"]
    }


@router.get("/news/{symbol}")
def stock_news(symbol: str):

    return {
        "symbol": symbol.upper(),
        "news": get_stock_news(symbol)
    }


@router.get("/score/{symbol}")
def stock_score(symbol: str):

    stock = get_stock_info(symbol)

    if "error" in stock:
        return stock

    ai_result = get_recommendation(
        symbol,
        stock["current_price"]
    )

    news = get_stock_news(symbol)

    positive_news = 0
    negative_news = 0

    for item in news:

        if item.get("sentiment") == "Positive":
            positive_news += 1

        elif item.get("sentiment") == "Negative":
            negative_news += 1

    score = calculate_stock_score(
        stock["current_price"],
        ai_result["recommendation"],
        positive_news,
        negative_news
    )

    if score >= 80:
        risk = "LOW"
    elif score >= 60:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    return {
        "symbol": symbol.upper(),
        "score": score,
        "recommendation": ai_result["recommendation"],
        "confidence": ai_result["confidence"],
        "risk": risk,
        "positive_news": positive_news,
        "negative_news": negative_news
    }


# NEW: Stock Price History Endpoint
@router.get("/history/{symbol}")
def stock_history(symbol: str):

    try:
        stock = yf.Ticker(symbol)

        hist = stock.history(period="1mo")

        data = []

        for index, row in hist.iterrows():
            data.append({
                "date": str(index.date()),
                "price": round(float(row["Close"]), 2)
            })

        return data

    except Exception as e:
        return {
            "error": str(e)
        }