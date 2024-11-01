from users.models import Subscription, SubscriptionEnum
from users.constants import SUBSCRIPTION_TOKEN_MAPPING

def update_user_subscription(user, subscription_type):
    
    try:
        # Validate subscription type
        permitted_subscription_types = [e.name for e in SubscriptionEnum]
        if subscription_type not in permitted_subscription_types:
            print('Invalid subscription type', subscription_type, permitted_subscription_types)
            raise Exception('Invalid subscription type')
        
        # Get existing subscription if any
        existing_subscription = Subscription.objects.filter(user=user).first()
        current_tokens = existing_subscription.tokens_count if existing_subscription else 0
        
        # Add new tokens to existing tokens
        tokens_count = SUBSCRIPTION_TOKEN_MAPPING.get(subscription_type)
        total_tokens = current_tokens + tokens_count
            
        subscription, created = Subscription.objects.update_or_create(
            user=user,
            defaults={
                'subscription_type': subscription_type,
                'tokens_count': total_tokens
            }
        )
        
    except Exception as e:
        print(e)
        return False
    return True