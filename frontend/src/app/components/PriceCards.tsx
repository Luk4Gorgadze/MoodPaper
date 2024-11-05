'use client'
import PaypalWrapper from "./PaypalWrapper";
import { useState, useContext } from 'react';
import { AuthContext } from './Container';


export default function PriceCards() {
    const { user } = useContext(AuthContext);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [count, setCount] = useState(0);

    const handlePaymentSuccess = () => {
        setCount(count + 1);
        setPaymentSuccess(true);
    };
    return (
        <div className="mt-[60px] mb-[100px]">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Starter Card */}
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white">
                    <div className="flex flex-col h-full justify-start">
                        <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for starting out and experimenting</p>
                        <div className="">
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">Free</span>
                                <span className="text-gray-500 dark:text-gray-400"></span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>1 token</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Unique quiz</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"></div>
                                    <span className="hidden md:block text-transparent">AI generated images</span>
                                </li>
                            </ul>
                            {/* <button
                                disabled
                                className="h-[115px] w-full px-4 py-2 bg-gray-400/50 text-white text-xl font-bold rounded cursor-not-allowed"
                            >
                                Free
                            </button> */}
                            <div className="text-3xl font-bold">
                                :)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Standard Card */}
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white">
                    <div className="flex flex-col h-full">
                        <h3 className="mb-4 text-2xl font-semibold">Standard</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">20 tokens and access to public library which stores your images</p>
                        <div className="mt-auto">
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">$5</span>
                                <span className="text-gray-500 dark:text-gray-400"></span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>20 tokens</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Unique quizzes</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Upload to image gallery</span>
                                </li>
                            </ul>
                            {/* <button className="w-full px-4 py-2 bg-accent text-white font-bold rounded hover:bg-accent/80">Get Started</button> */}
                            {user && (
                                <PaypalWrapper user={user} order_price={5} subscription_type="STANDARD" onPaymentSuccess={handlePaymentSuccess} />
                            )}
                            {!user && (
                                <div className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded">Log In to Purchase</div>
                            )
                            }
                        </div>
                    </div>
                </div>

                {/* Premium Card */}
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white">
                    <div className="flex flex-col h-full">
                        <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">60 tokens and access to public library which stores your images</p>
                        <div className="mt-auto">
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">$10</span>
                                <span className="text-gray-500 dark:text-gray-400"></span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>60 tokens</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Unique quizzes</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Upload to image gallery</span>
                                </li>
                            </ul>
                            {/* <button className="w-full px-4 py-2 bg-accent text-white font-bold rounded hover:bg-accent/80">Get Started</button> */}
                            {user && (
                                <PaypalWrapper user={user} order_price={10} subscription_type="PREMIUM" onPaymentSuccess={handlePaymentSuccess} />
                            )}
                            {!user && (
                                <div className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded">Log In to Purchase</div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
