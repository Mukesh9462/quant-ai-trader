import requests
from fastapi import HTTPException

API_KEY = "YOUR_ALPHAVANTAGE_API_KEY"

def get_current_price(symbol):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch current price")
    
    data = response.json()
    return float(data['Global Quote']['05. price'])

def get_historical_data(symbol, interval="daily", outputsize="compact"):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_{interval.upper()}&symbol={symbol}&outputsize={outputsize}&apikey={API_KEY}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch historical data")
    
    data = response.json()
    return data['Time Series (' + interval.upper() + ')']
