# utils/auth.py

from kinde_sdk.kinde_api_client import KindeApiClient, GrantType
import os
from dotenv import load_dotenv

load_dotenv()

kinde_client = KindeApiClient(
    domain=os.getenv("KINDE_ISSUER_URL"),
    callback_url=os.getenv("KINDE_CALLBACK_URL"),
    client_id=os.getenv("KINDE_CLIENT_ID"),
    client_secret=os.getenv("KINDE_CLIENT_SECRET"),
    grant_type=GrantType.AUTHORIZATION_CODE,
)
