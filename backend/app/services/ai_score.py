def calculate_stock_score(
    current_price: float,
    recommendation: str,
    positive_news: int,
    negative_news: int
):
    score = 50

    if recommendation == "BUY":
        score += 25

    elif recommendation == "HOLD":
        score += 10

    else:
        score -= 20

    score += positive_news * 3
    score -= negative_news * 3

    score = max(0, min(100, score))

    return score