from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.jwt_handler import verify_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    print("GET_CURRENT_USER CALLED")
    print("=" * 50)
    print("TOKEN RECEIVED:")
    print(token)

    payload = verify_token(token)

    print("PAYLOAD:")
    print(payload)
    print("=" * 50)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    return payload