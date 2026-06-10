def get_recommendation(symbol: str, current_price: float):

    if current_price > 200:
        return {
            "recommendation": "BUY",
            "confidence": 80,
            "reason": "Strong market momentum"
        }

    elif current_price > 100:
        return {
            "recommendation": "HOLD",
            "confidence": 65,
            "reason": "Stable stock performance"
        }

    else:
        return {
            "recommendation": "SELL",
            "confidence": 70,
            "reason": "Weak market performance"
        }