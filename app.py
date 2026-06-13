import logging
from fastapi import FastAPI, HTTPException
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc}")
    return {"detail": exc.detail}

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_error_handler(request, exc):
    logger.error(f"SQLAlchemy Error: {exc}")
    return {"detail": "Database error"}
