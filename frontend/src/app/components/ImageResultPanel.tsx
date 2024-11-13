'use client'
import { getCookie } from '../utils/cookies';
import { AuthContext } from '../components/Container'
import { useContext, useState, useEffect } from 'react'


interface ImageResultPanelProps {
    isPublic: boolean;
    setIsPublic: (value: boolean) => void;
    currentQuestionIndex: number;
    quizQuestions: any[]; // Replace 'any' with your actual quiz question type
    userAnswers: string[]; // Added this line
    setIsQuizOpen: (value: boolean) => void;
    setCurrentQuestionIndex: (index: number) => void;
    setQuizQuestions: (questions: any[]) => void;
    setUserAnswers: (answers: string[]) => void;
    newImageData: any;
}

const ImageSkeleton = ({ deviceType }: { deviceType: 'desktop' | 'mobile' }) => (
    <div className={`relative w-full ${deviceType === 'desktop' ? 'aspect-[16/9]' : 'aspect-[9/16]'} bg-gray-800 rounded-xl overflow-hidden animate-pulse`}>
        <div className="w-full h-full bg-gray-700"></div>
    </div>
);

export default function ImageResultPanel({
    isPublic,
    setIsPublic,
    currentQuestionIndex,
    quizQuestions,
    userAnswers,
    setIsQuizOpen,
    setCurrentQuestionIndex,
    setQuizQuestions,
    setUserAnswers,
    newImageData
}: ImageResultPanelProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const { user, selectedDevice } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(newImageData.image_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setImageUrl(url);
                setIsImageLoading(false);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [newImageData.image_url]);

    const handleDone = () => {
        setCurrentQuestionIndex(0);
        setQuizQuestions([]);
        setUserAnswers([]);
        setIsQuizOpen(false);
        console.log(currentQuestionIndex)
        console.log(quizQuestions)
        console.log(userAnswers)
    };

    const handleFinish = async () => {
        try {
            const imageDataToSend = {
                ...newImageData,
                is_public: isPublic
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mood/mood-wallpaper-finish/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') || '',
                    'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                },
                body: JSON.stringify(imageDataToSend)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to save image');
            }

            console.log(data)

            // Reset the quiz state after successful save
            setCurrentQuestionIndex(0);
            setQuizQuestions([]);
            setUserAnswers([]);
            setIsQuizOpen(false);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    return (
        <div className='mx-auto flex flex-col md:flex-row gap-8' key={imageUrl}>
            <div className='w-full md:w-1/2'>
                <div className="relative group">
                    {isImageLoading && (
                        <ImageSkeleton deviceType={selectedDevice} />
                    )}
                    {imageUrl && (
                        <img
                            key={newImageData.id}
                            src={imageUrl}
                            alt="Left image"
                            width={newImageData.width}
                            height={newImageData.height}
                            className={`object-cover rounded-xl transition-transform duration-200`}
                            loading="lazy"
                        />
                    )}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                try {
                                    // Fetch the image as a blob
                                    const response = await fetch(newImageData.image_url);
                                    const blob = await response.blob();

                                    // Create a URL for the blob
                                    const url = window.URL.createObjectURL(blob);

                                    // Create and trigger download link
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `${newImageData.title}.jpg`;
                                    link.style.display = 'none';
                                    document.body.appendChild(link);
                                    link.click();

                                    // Cleanup
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(url);
                                } catch (error) {
                                    console.error('Download failed:', error);
                                }
                            }}
                            className="bg-black/50 hover:bg-black/70 p-2 rounded-lg backdrop-blur-sm transition-all duration-200"
                            title="Download image"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 space-y-6'>
                <div className="space-y-10 flex flex-col">
                    <div className="flex items-center">
                        <p className="w-full rounded-lg p-4 font-bold text-lg bg-white/10 backdrop-blur-sm">
                            Author: {newImageData.username}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="w-full rounded-lg p-4 font-bold text-lg bg-white/10 backdrop-blur-sm">
                            Title: {newImageData.title}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="w-full rounded-lg p-4 font-bold text-lg bg-white/10 backdrop-blur-sm">
                            Description: {newImageData.description}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="w-full rounded-lg p-4 font-bold text-lg bg-white/10 backdrop-blur-sm">
                            Resolution: {newImageData.width} x {newImageData.height}
                        </p>
                    </div>
                    <div className="flex items-center">
                        {user?.subscription.subscription_type !== 'FREE' && (
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                <span className="ms-3 font-bold text-lg">Share publicly</span>
                            </label>
                        )}
                    </div>
                    <button
                        onClick={handleFinish}
                        className="w-full sm:w-auto sm:px-8 mx-auto bg-gradient-to-r from-accent to-blue-900 text-white font-bold py-4 rounded-lg text-xl hover:opacity-80 transition-opacity relative overflow-hidden animate-gradient bg-[length:200%_100%]"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div >
    )
}
