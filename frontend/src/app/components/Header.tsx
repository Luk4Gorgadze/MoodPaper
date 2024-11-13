'use client';

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { User } from '@/app/utils/types'
import { checkAuthStatus } from '@/app/utils/auth'
import { TransitionLink } from '../utils/transitionLink';


interface HeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User | null;
    setUser: (value: User | null) => void;
}

const Header = ({ isAuthenticated, setIsAuthenticated, user, setUser }: HeaderProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/generate', label: 'Generate' },
        { href: '/pricing', label: 'Pricing' },
    ]

    const checkCookies = () => {
        console.log('Cookies:', document.cookie);
    };

    useEffect(() => {
        checkCookies();
    }, []);

    useEffect(() => {
        // Check only when component mounts
        checkAuthStatus(setIsAuthenticated, setUser)
    }, []);

    const handleSignUp = async () => {
        try {
            console.log('Initiating sign up...');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
                method: 'GET',
                credentials: 'include',
            });

            console.log('Sign up response status:', response.status);
            console.log('Sign up response headers:', Object.fromEntries(response.headers.entries()));

            if (response.ok) {
                const data = await response.json();
                console.log('Sign up response data:', data);

                // Check cookies after sign-up attempt
                checkCookies();

                if (data.redirect_url) {
                    console.log('Redirecting to:', data.redirect_url);
                    router.push(data.redirect_url);
                } else {
                    console.error('No redirect URL provided');
                }
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    const handleSignIn = async () => {
        try {
            console.log('Initiating sign in...');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
                method: 'GET',
                credentials: 'include',
            });

            console.log('Sign in response status:', response.status);
            console.log('Sign in response headers:', Object.fromEntries(response.headers.entries()));

            if (response.ok) {
                const data = await response.json();
                console.log('Sign in response data:', data);

                // Check cookies after sign-in attempt
                checkCookies();

                if (data.redirect_url) {
                    console.log('Redirecting to:', data.redirect_url);
                    router.push(data.redirect_url);
                } else {
                    console.error('No redirect URL provided');
                }
            } else {
                console.error('Signin failed');
            }
        } catch (error) {
            console.error('Error during signin:', error);
        }
    }

    const handleLogout = async () => {
        try {
            // Get CSRF token from cookies
            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split('=')
                acc[key] = value
                return acc
            }, {} as { [key: string]: string })

            // Send request to logout endpoint
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': cookies['csrftoken'],
                    'Cookie': `sessionid=${cookies['sessionid']}; csrftoken=${cookies['csrftoken']}`
                }
            });

            const data = await response.json();

            console.log(data)
            if (response.ok) {
                setIsAuthenticated(false)
                window.location.href = data.redirect_url;
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <header className="">
            <div className="container mx-auto py-4 flex items-center justify-between sm:flex-row flex-col sm:gap-0 gap-10">
                <div className="flex items-center flex-shrink-0">
                    <Image
                        src="/favicon.png"
                        alt="Moodpaper Logo"
                        width={32}
                        height={32}
                        className="mr-2"
                    />
                    <Link href="/" className="text-2xl font-bold text-white whitespace-nowrap">
                        MOODPAPER
                    </Link>
                </div>

                <button
                    className="lg:hidden text-white font-semibold text-right sm:text-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                <nav className="hidden lg:block flex-grow max-w-2xl mx-4 h-5">
                    <ul className="flex space-x-6 justify-center">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <div className='transition-duration-100 hover:border-b-[2px] hover:pb-2 hover:border-accent'>
                                    <TransitionLink
                                        href={item.href}
                                        item={item}
                                    >
                                        {item.label}
                                    </TransitionLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden lg:flex space-x-3 items-center justify-center flex-shrink-0">
                    {isAuthenticated ? (
                        <>
                            <span className="text-white text-center">{user?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-xl transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignUp} className="border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-xl transition-colors duration-200">
                                Sign Up
                            </button>
                            <button onClick={handleSignIn} className="border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-xl transition-colors duration-200">
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden">
                    <nav className="px-4 pt-2 pb-4">
                        <ul className="space-y-2 text-center">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <TransitionLink
                                        href={item.href}
                                        item={item}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </TransitionLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="px-4 pb-4 space-y-2">
                        {isAuthenticated ? (
                            <>
                                <span className="block text-center text-white mb-2">{user?.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-3xl transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignUp} className="block w-full text-center border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-3xl transition-colors duration-200">
                                    Sign Up
                                </button>
                                <button onClick={handleSignIn} className="block w-full text-center border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-3xl transition-colors duration-200">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
