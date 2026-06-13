from fastapi import APIRouter, Depends
from sqlalchemy.exc import SQLAlchemyError

from app.api.dependencies import get_current_user
from app.services.market_data import get_current_price, get_historical_data

router = APIRouter()

@router.get("/current_price/{symbol}")
def get_stock_current_price(symbol: str):
    return {"symbol": symbol, "price": get_current_price(symbol)}

@router.get("/historical_data/{symbol}")
def get_stock_historical_data(symbol: str):
    return {"symbol": symbol, "data": get_historical_data(symbol)}
