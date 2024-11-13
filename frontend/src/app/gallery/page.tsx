'use client'

import GalleryImage from '../components/GalleryImage'
import { useState, useEffect } from 'react'
import { getCookie } from '../utils/cookies';


// Add type definition
interface GalleryImage {
    id: number;
    image_url: string;
    title: string | null;
    username: string | null;
    width: number;
    height: number;
    description: string;
}

export default function Gallery() {
    // Update state to use the type
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [viewType, setViewType] = useState<'public' | 'personal'>('public');

    // Add dimensions mapping
    const deviceDimensions = {
        desktop: { width: 1792, height: 1024 },
        mobile: { width: 1024, height: 1792 }
    };

    // Add function to fetch images from backend
    const fetchImages = async (page: number) => {
        try {
            setIsLoading(true);
            const { width, height } = deviceDimensions[selectedDevice];

            const endpoint = viewType === 'public'
                ? '/mood/mood-wallpapers-public/'
                : '/mood/mood-wallpapers-personal/';

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endpoint}?page=${page}&width=${width}&height=${height}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken') || '',
                        'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            setImages(data.results);
            setTotalPages(Math.ceil(data.count / 16));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setIsLoading(false);
        }
    };

    // Fetch images when page or device changes
    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage, selectedDevice, viewType]);

    // Add device selection state

    // Add pagination controls component
    const Pagination = () => (
        <div className="flex justify-center sm:gap-4 mt-8">
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                }}
                disabled={currentPage === 1}
                className="px-6 py-2.5 text-sm font-medium text-white rounded-xl
                    disabled:opacity-50 disabled:cursor-not-allowed
                    bg-white/10 backdrop-blur-sm border border-white/10
                    hover:bg-white/20 transition-all duration-200
                    hover:shadow-lg hover:shadow-purple-500/20"
            >
                Previous
            </button>
            <span className="px-4 py-2.5 text-sm sm:text-base text-white/90">
                {currentPage} / {totalPages}
            </span>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                }}
                disabled={currentPage === totalPages}
                className="px-6 py-2.5 text-sm font-medium text-white rounded-xl
                    disabled:opacity-50 disabled:cursor-not-allowed
                    bg-white/10 backdrop-blur-sm border border-white/10
                    hover:bg-white/20 transition-all duration-200
                    hover:shadow-lg hover:shadow-purple-500/20"
            >
                Next
            </button>
        </div>
    );

    return (
        <div className="container mx-auto mt-20 mb-[50px]">
            <div className="text-white">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">
                        {viewType === 'public' ? 'Public Wallpapers' : 'My Library'}
                    </h1>
                </div>

                {/* Add device selection buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:justify-between">
                    <div className='flex flex-row gap-2 sm:gap-5'>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(1);
                                setSelectedDevice('desktop');
                            }}
                            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 text-sm sm:text-base ${selectedDevice === 'desktop'
                                ? 'bg-gradient-to-r from-accent to-blue-900 animate-gradient bg-[length:200%_100%] text-white'
                                : 'bg-transparent text-white/60'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                            </svg>
                            Desktop
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(1);
                                setSelectedDevice('mobile');
                            }}
                            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 text-sm sm:text-base ${selectedDevice === 'mobile'
                                ? 'bg-gradient-to-r from-accent to-blue-900 animate-gradient bg-[length:200%_100%] text-white'
                                : 'bg-transparent text-white/60'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                            Mobile
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setViewType(prev => prev === 'public' ? 'personal' : 'public');
                            setCurrentPage(1);
                        }}
                        className="px-4 sm:px-6 py-2 text-sm font-medium text-white rounded-xl
                            bg-white/10 backdrop-blur-sm border border-white/10
                            hover:bg-white/20 transition-all duration-200
                            hover:shadow-lg hover:shadow-purple-500/20"
                    >
                        {viewType === 'public' ? 'View My Library' : 'View Public Gallery'}
                    </button>
                </div>

                <p className="text-lg mb-10"><span className="text-accent font-bold">Feel free to download,</span> since users are able to share their wallpapers with the public if they want</p>
            </div>
            <div className={`grid ${selectedDevice === 'desktop' ? 'grid-cols-1 md:grid-cols-2 gap-4 md:gap-4' : 'grid-cols-2 gap-4 md:grid-cols-4'}`}>
                {!isLoading && (
                    images.map((image, index) => (
                        <div
                            key={image.id}
                            className="animate-[scaleIn_0.5s_ease-out]"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <GalleryImage
                                imageUrl={image.image_url}
                                title={image.title || 'Untitled'}
                                author={image.username || 'Anonymous'}
                                dimensions={`${image.width}x${image.height}`}
                                description={image.description || ' No description'}
                            />
                        </div>
                    ))
                )}
            </div>
            <Pagination />
        </div>
    )
}
