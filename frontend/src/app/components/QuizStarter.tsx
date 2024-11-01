'use client'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { getCookie } from '../utils/cookies'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from '../components/Container'


interface QuizStarterProps {
    selectedDevice: 'mobile' | 'desktop' | null
    setSelectedDevice: (device: 'mobile' | 'desktop') => void
    isQuizOpen: boolean
    setIsQuizOpen: (isOpen: boolean) => void
    setQuizQuestions: (questions: any[]) => void
    setQuizDone: (done: boolean) => void
}

export default function QuizStarter({ selectedDevice, setSelectedDevice, isQuizOpen, setIsQuizOpen, setQuizQuestions, setQuizDone }: QuizStarterProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { selectedStyle, setSelectedStyle } = useContext(AuthContext)
    const getQuizQuestions = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mood/mood-wallpaper-quiz/`, {
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken') || '',
                    'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                }
            })
            const data = await response.json()
            setQuizQuestions(data.questions)
            setIsQuizOpen(true)
            setQuizDone(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnGenerate = () => {
        getQuizQuestions()

    }

    return (
        <div className='max-w-xl h-auto min-h-[24rem] rounded-xl mx-auto mt-10 sm:mt-20 flex flex-col items-center px-4'>
            <div className='text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-8'>Choose the resolution</div>
            <div className='flex justify-center gap-4 sm:gap-8 mt-6 sm:mt-10 mb-6 sm:mb-10'>
                <div
                    className={`flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 p-3 sm:p-4 rounded-lg ${selectedDevice === 'mobile' ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedDevice('mobile')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke={selectedDevice === 'mobile' ? 'white' : '#6B7280'}
                        className="w-8 h-8 sm:w-10 sm:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <div className='mt-2 text-center'>
                        <div className='font-bold text-base sm:text-lg'>Mobile</div>
                        <div className='text-xs sm:text-sm font-bold'>1024x1792</div>
                    </div>
                </div>

                <div
                    className={`flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 p-3 sm:p-4 rounded-lg ${selectedDevice === 'desktop' ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedDevice('desktop')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke={selectedDevice === 'desktop' ? 'white' : '#6B7280'}
                        className="w-8 h-8 sm:w-10 sm:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    <div className='mt-2 text-center'>
                        <div className='font-bold text-base sm:text-lg'>Desktop</div>
                        <div className='text-xs sm:text-sm text-white font-bold'>1792x1024</div>
                    </div>
                </div>
            </div>

            <div className='text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-8 mt-8'>Choose the style</div>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-4'>
                {['Realistic', 'Painterly', 'Modern art', 'Sketch', 'Any'].map((style) => (
                    <button
                        key={style}
                        className={`px-4 py-2 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105
                            ${selectedStyle === style
                                ? 'bg-accent text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        onClick={() => setSelectedStyle(style)}
                    >
                        {style}
                    </button>
                ))}
            </div>

            <button
                className='bg-accent font-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl mt-6 sm:mt-10 text-base sm:text-lg transition-transform duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                onClick={() => handleOnGenerate()}
                disabled={isLoading || !selectedDevice || !selectedStyle}
            >
                {isLoading ? (
                    <LoadingSpinner size={5} text="Loading..." />
                ) : (
                    'Generate'
                )}
            </button>
        </div>
    )
}
