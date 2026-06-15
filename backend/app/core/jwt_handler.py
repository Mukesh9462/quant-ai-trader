from datetime import datetime, timedelta
from jose import jwt, JWTError

SECRET_KEY = "quant_ai_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {"exp": expire}
    )

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("=" * 50)
    print("TOKEN CREATED:")
    print(token)
    print("=" * 50)

    return token


def verify_token(token: str):

    print("=" * 50)
    print("TOKEN TO VERIFY:")
    print(token)

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("DECODED PAYLOAD:")
        print(payload)
        print("=" * 50)

        return payload

    except JWTError as e:

        print("=" * 50)
        print("JWT ERROR:")
        print(str(e))
        print("=" * 50)

        return None

    except Exception as e:

        print("=" * 50)
        print("UNEXPECTED ERROR:")
        print(str(e))
        print("=" * 50)

        return None