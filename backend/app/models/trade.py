from sqlalchemy import Column, Integer, String, Float, ForeignKey

from app.database.database import Base


class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    symbol = Column(String)

    trade_type = Column(String)

    quantity = Column(Integer)

    price = Column(Float)