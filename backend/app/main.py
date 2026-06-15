from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.portfolio import router as portfolio_router
from app.api.market import router as market_router
from app.api.trade import router as trade_router
from app.api.watchlist import router as watchlist_router

app = FastAPI(
    title="Quant AI Trader",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

# Portfolio Routes
app.include_router(
    portfolio_router,
    prefix="/portfolio",
    tags=["Portfolio"]
)

# Market Routes
app.include_router(
    market_router,
    prefix="/market",
    tags=["Market"]
)

# Trade Simulator Routes
app.include_router(
    trade_router,
    prefix="/trade",
    tags=["Trade Simulator"]
)

# Watchlist Routes
app.include_router(
    watchlist_router,
    prefix="/watchlist",
    tags=["Watchlist"]
)

@app.get("/")
def home():
    return {
        "message": "Quant AI Trader Backend Running"
    }