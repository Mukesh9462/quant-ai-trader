def get_recommendation(symbol: str):

    current_price = 291.13

    if current_price > 200:
        return {
            "symbol": symbol,
            "price": current_price,
            "recommendation": "BUY",
            "confidence": 80,
            "reason": "Strong market momentum"
        }

    elif current_price > 100:
        return {
            "symbol": symbol,
            "price": current_price,
            "recommendation": "HOLD",
            "confidence": 65,
            "reason": "Stable stock performance"
        }

    else:
        return {
            "symbol": symbol,
            "price": current_price,
            "recommendation": "SELL",
            "confidence": 70,
            "reason": "Weak market performance"
        }