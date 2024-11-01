// Create auth context
interface Subscription {
    subscription_type: string;
    tokens_count: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    subscription: Subscription;
}

interface GalleryImageProps {
    imageUrl: string;
    title: string;
    author: string;
    date?: string;
    aspectRatio?: '1:1' | '16:9';
    dimensions?: string;  // Add dimensions prop
}

export type { Subscription, User, GalleryImageProps };
