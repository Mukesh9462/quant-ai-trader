from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_watchlist():
    return [
        {
            "id": 1,
            "symbol": "AAPL"
        },
        {
            "id": 2,
            "symbol": "NVDA"
        },
        {
            "id": 3,
            "symbol": "TSLA"
        }
    ]


@router.post("/add")
def add_watchlist_stock(data: dict):
    return {
        "message": "Added",
        "symbol": data["symbol"]
    }


@router.delete("/{id}")
def delete_watchlist_stock(id: int):
    return {
        "message": "Deleted",
        "id": id
    }