from fastapi import APIRouter

from app.services.market_data import (
    get_current_price,
    get_historical_data,
)

from app.services.ai_recommendation import (
    get_recommendation,
)

router = APIRouter()


@router.get("/current_price/{symbol}")
def get_stock_current_price(symbol: str):
    return {
        "symbol": symbol,
        "price": get_current_price(symbol)
    }


@router.get("/historical_data/{symbol}")
def get_stock_historical_data(symbol: str):
    return {
        "symbol": symbol,
        "data": get_historical_data(symbol)
    }


@router.get("/recommendation/{symbol}")
def recommendation(symbol: str):
    return get_recommendation(symbol)