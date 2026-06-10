from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.trade import Trade
from app.models.user import User

from app.schemas.trade import TradeCreate

from app.core.dependencies import get_current_user

from app.services.market_data import get_current_price

router = APIRouter()


@router.post("/buy")
def buy_stock(
    trade: TradeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(
            User.email == current_user["email"]
        )
        .first()
    )

    current_price = get_current_price(
        trade.symbol
    )

    item = Trade(
        user_id=user.id,
        symbol=trade.symbol.upper(),
        trade_type="BUY",
        quantity=trade.quantity,
        price=current_price
    )

    db.add(item)
    db.commit()

    return {
        "message": "BUY ORDER EXECUTED",
        "price": current_price
    }


@router.post("/sell")
def sell_stock(
    trade: TradeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(
            User.email == current_user["email"]
        )
        .first()
    )

    current_price = get_current_price(
        trade.symbol
    )

    item = Trade(
        user_id=user.id,
        symbol=trade.symbol.upper(),
        trade_type="SELL",
        quantity=trade.quantity,
        price=current_price
    )

    db.add(item)
    db.commit()

    return {
        "message": "SELL ORDER EXECUTED",
        "price": current_price
    }


@router.get("/")
def get_trades(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(
            User.email == current_user["email"]
        )
        .first()
    )

    return (
        db.query(Trade)
        .filter(
            Trade.user_id == user.id
        )
        .all()
    )