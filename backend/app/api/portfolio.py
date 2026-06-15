from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.portfolio import Portfolio
from app.models.user import User

from app.schemas.portfolio import PortfolioCreate

from app.core.dependencies import get_current_user

from app.services.market_data import get_current_price

router = APIRouter()


@router.post("/add")
def add_stock(
    stock: PortfolioCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(User.email == current_user["email"])
        .first()
    )

    item = Portfolio(
        user_id=user.id,
        symbol=stock.symbol.upper(),
        quantity=stock.quantity,
        buy_price=stock.buy_price
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return {
        "message": "Stock Added Successfully",
        "stock_id": item.id
    }


@router.get("/")
def get_portfolio(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(User.email == current_user["email"])
        .first()
    )

    stocks = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user.id)
        .all()
    )

    return stocks


@router.get("/performance")
def portfolio_performance(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(User.email == current_user["email"])
        .first()
    )

    stocks = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user.id)
        .all()
    )

    results = []

    for stock in stocks:

        current_price = get_current_price(
            stock.symbol
        )

        investment = (
            stock.quantity *
            stock.buy_price
        )

        current_value = (
            stock.quantity *
            current_price
        )

        profit_loss = (
            current_value -
            investment
        )

        profit_percent = (
            (profit_loss / investment) * 100
            if investment > 0 else 0
        )

        results.append({
            "stock_id": stock.id,
            "symbol": stock.symbol,
            "quantity": stock.quantity,
            "buy_price": stock.buy_price,
            "current_price": current_price,
            "investment": round(investment, 2),
            "current_value": round(current_value, 2),
            "profit_loss": round(profit_loss, 2),
            "profit_percent": round(profit_percent, 2)
        })

    return results


@router.get("/summary")
def portfolio_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(User.email == current_user["email"])
        .first()
    )

    stocks = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user.id)
        .all()
    )

    total_investment = 0
    total_value = 0

    for stock in stocks:

        current_price = get_current_price(
            stock.symbol
        )

        total_investment += (
            stock.buy_price *
            stock.quantity
        )

        total_value += (
            current_price *
            stock.quantity
        )

    total_profit_loss = (
        total_value -
        total_investment
    )

    total_profit_percent = (
        (total_profit_loss / total_investment) * 100
        if total_investment > 0 else 0
    )

    return {
        "total_stocks": len(stocks),
        "total_investment": round(total_investment, 2),
        "current_value": round(total_value, 2),
        "total_profit_loss": round(total_profit_loss, 2),
        "total_profit_percent": round(total_profit_percent, 2)
    }


@router.get("/allocation")
def portfolio_allocation(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(User.email == current_user["email"])
        .first()
    )

    stocks = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user.id)
        .all()
    )

    allocation = []

    for stock in stocks:

        current_price = get_current_price(
            stock.symbol
        )

        value = (
            stock.quantity *
            current_price
        )

        allocation.append({
            "name": stock.symbol,
            "value": round(value, 2)
        })

    return allocation


@router.delete("/{stock_id}")
def delete_stock(
    stock_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    stock = (
        db.query(Portfolio)
        .filter(Portfolio.id == stock_id)
        .first()
    )

    if not stock:
        return {
            "error": "Stock not found"
        }

    db.delete(stock)
    db.commit()

    return {
        "message": "Stock Deleted Successfully"
    }