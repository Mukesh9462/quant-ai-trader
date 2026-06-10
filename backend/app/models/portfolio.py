from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.database.database import Base


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    symbol = Column(String)
    quantity = Column(Integer)
    buy_price = Column(Float)