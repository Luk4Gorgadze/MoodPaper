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
        <div className='h-auto min-h-[24rem] rounded-xl mx-auto flex flex-col items-center px-8 py-10 bg-white/10 backdrop-blur-lg shadow-xl'>
            <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8 text-white'>Choose the resolutions</h2>

            <div className='flex justify-center gap-8 sm:gap-12 mb-12'>
                <div
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 p-4 sm:p-6 rounded-xl backdrop-blur-sm
                        ${selectedDevice === 'mobile'
                            ? 'bg-accent/90 shadow-lg shadow-accent/30 scale-105'
                            : 'bg-white/20 hover:bg-white/30 hover:scale-105'}`}
                    onClick={() => setSelectedDevice('mobile')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="white"
                        className="w-8 h-8 sm:w-10 sm:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <div className='mt-3 text-center'>
                        <div className='font-bold text-lg sm:text-xl text-white'>Mobile</div>
                        <div className='text-sm sm:text-base font-medium text-white/90'>1024x1792</div>
                    </div>
                </div>

                <div
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 p-4 sm:p-6 rounded-xl backdrop-blur-sm
                        ${selectedDevice === 'desktop'
                            ? 'bg-accent/90 shadow-lg shadow-accent/30 scale-105'
                            : 'bg-white/20 hover:bg-white/30 hover:scale-105'}`}
                    onClick={() => setSelectedDevice('desktop')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="white"
                        className="w-8 h-8 sm:w-10 sm:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    <div className='mt-3 text-center'>
                        <div className='font-bold text-lg sm:text-xl text-white'>Desktop</div>
                        <div className='text-sm sm:text-base font-medium text-white/90'>1792x1024</div>
                    </div>
                </div>
            </div>

            <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8 text-white'>Choose the style</h2>
            <div className='flex flex-wrap justify-center gap-4 mb-12'>
                {['Realistic', 'Painterly', 'Modern art', 'Sketch', 'Any'].map((style) => (
                    <button
                        key={style}
                        className={`px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300
                            ${selectedStyle === style
                                ? 'bg-accent/90 text-white shadow-lg shadow-accent/30 scale-105'
                                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105 backdrop-blur-sm'
                            }`}
                        onClick={() => setSelectedStyle(style)}
                    >
                        {style}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <LoadingSpinner size={8} />
                    <span className="bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%] font-bold text-xl">
                        Generating your quiz...
                    </span>
                </div>
            ) : (
                <button
                    className="w-full sm:w-auto sm:px-8 mx-auto bg-gradient-to-r from-accent to-blue-900 text-white font-bold py-4 rounded-lg text-xl hover:opacity-80 transition-opacity relative overflow-hidden animate-gradient bg-[length:200%_100%]"
                    onClick={() => handleOnGenerate()}
                    disabled={!selectedDevice || !selectedStyle}
                >
                    Generate
                </button>
            )}
        </div>
    )
}
