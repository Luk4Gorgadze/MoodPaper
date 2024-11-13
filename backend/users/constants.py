from enum import Enum

class SubscriptionEnum(Enum):
    FREE = 'Free'
    STANDARD = 'Standard'
    PREMIUM = 'Premium'

FREE_TOKEN_COUNT = 0
STANDARD_TOKEN_COUNT = 20
PREMIUM_TOKEN_COUNT = 60

SUBSCRIPTION_TOKEN_MAPPING = {
    SubscriptionEnum.FREE.name: FREE_TOKEN_COUNT,
    SubscriptionEnum.STANDARD.name: STANDARD_TOKEN_COUNT,
    SubscriptionEnum.PREMIUM.name: PREMIUM_TOKEN_COUNT
}

