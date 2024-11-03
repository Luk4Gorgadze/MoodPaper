'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies'
import { User } from '@/app/utils/types'

interface PaypalWrapperProps {
    user: User;
    order_price: number;
    onPaymentSuccess: () => void;
    subscription_type: string;
}

export default function PaypalWrapper({ user, order_price, onPaymentSuccess, subscription_type }: PaypalWrapperProps) {


    const paypalCreateOrder = async () => {
        try {


            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/paypal/create-order/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') || '',
                    'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                },
                body: JSON.stringify({
                    user_id: user.id,
                    order_price
                })
            });
            const data = await response.json();
            console.log(data);
            if (!data.id) {
                throw new Error('Invalid order ID received');
            }
            return data.id;
        } catch (err) {
            console.error('Failed to create order:', err);
            throw err;
        }
    };

    const paypalCaptureOrder = async (orderID: string, subscription_type: string) => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/paypal/capture-order/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') || '',
                    'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                },
                body: JSON.stringify({ order_id: orderID, subscription_type, user_id: user.id })
            });

            const data = await response.json();
            if (data.operationDone == true) {
                console.log('Payment Success')
                onPaymentSuccess();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ colorScheme: 'none' }}>
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID : '',
                    currency: 'USD',
                    intent: 'capture'
                }}
            >
                <div className="relative z-0">
                    <PayPalButtons
                        style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50,
                        }}
                        createOrder={async (data, actions) => {
                            const order_id = await paypalCreateOrder();
                            if (!order_id) {
                                throw new Error('Failed to create PayPal order');
                            }
                            return order_id;
                        }}
                        onApprove={async (data, actions) => {
                            console.log(data)
                            await paypalCaptureOrder(data.orderID, subscription_type);
                            return undefined;
                        }}
                    />
                </div>
            </PayPalScriptProvider>

        </div>
    );
}