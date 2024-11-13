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
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 backdrop-blur-xl bg-white/10 rounded-lg xl:p-8 dark:text-white">
                    <div className="flex flex-col h-full justify-start">
                        <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">Starter</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Perfect for community enthusiasts and creative minds</p>
                        <div className="">
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">Free</span>
                                <span className="text-gray-500 dark:text-gray-400"></span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Participate in challenges for free tokens</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Get up to 50 free tokens</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"></div>
                                    <span className="hidden md:block text-transparent">AI generated images</span>
                                </li>
                            </ul>
                            <div className="flex flex-col gap-4">
                                <a
                                    href="https://discord.gg/xrXzE9aEM9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-4 py-2 bg-[#5865F2] text-white font-bold rounded hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-6 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                    Join Our Discord Community
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Standard Card */}
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 backdrop-blur-xl bg-white/10 rounded-lg xl:p-8 dark:text-white">
                    <div className="flex flex-col h-full">
                        <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">Standard</h3>
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
                <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-900 backdrop-blur-xl bg-white/10 rounded-lg xl:p-8 dark:text-white">
                    <div className="flex flex-col h-full">
                        <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">Premium</h3>
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
