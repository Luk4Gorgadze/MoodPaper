from enum import Enum

class SubscriptionEnum(Enum):
    FREE = 'Free'
    STANDARD = 'Standard'
    PREMIUM = 'Premium'

FREE_TOKEN_COUNT = 2
STANDARD_TOKEN_COUNT = 30
PREMIUM_TOKEN_COUNT = 90

SUBSCRIPTION_TOKEN_MAPPING = {
    SubscriptionEnum.FREE.name: FREE_TOKEN_COUNT,
    SubscriptionEnum.STANDARD.name: STANDARD_TOKEN_COUNT,
    SubscriptionEnum.PREMIUM.name: PREMIUM_TOKEN_COUNT
}

