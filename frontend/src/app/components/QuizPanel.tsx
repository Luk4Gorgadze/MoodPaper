'use client'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { FC } from 'react'
import { getCookie } from '../utils/cookies'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from '../components/Container'


interface QuizPanelProps {
    quizQuestions: string[]
    userAnswers: string[]
    currentAnswer: string
    currentQuestionIndex: number
    setCurrentQuestionIndex: (index: number) => void
    setCurrentAnswer: (answer: string) => void
    setUserAnswers: (answers: string[]) => void
    setQuizDone: (done: boolean) => void
    selectedDevice: string | null
    setGeneratedImageTitle: (title: string) => void
    setNewImageData: (data: any) => void
    isResultImageLoading: boolean
    setIsResultImageLoading: (loading: boolean) => void
}

const QuizPanel: FC<QuizPanelProps> = ({
    quizQuestions,
    userAnswers,
    currentAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setCurrentAnswer,
    setUserAnswers,
    setQuizDone,
    selectedDevice,
    setGeneratedImageTitle,
    setNewImageData,
    isResultImageLoading,
    setIsResultImageLoading
}) => {
    const handleNext = () => {
        const numberedAnswer = `${currentQuestionIndex + 1}. ${currentAnswer}`
        setUserAnswers([...userAnswers, numberedAnswer])
        setCurrentAnswer('')
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const { selectedStyle } = useContext(AuthContext)

    const handleGenerate = async () => {
        try {
            const numberedAnswer = `${currentQuestionIndex + 1}. ${currentAnswer}`
            const finalAnswers = [...userAnswers, numberedAnswer]
            setUserAnswers(finalAnswers)
            setCurrentAnswer('')
            setIsResultImageLoading(true)

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mood/mood-wallpaper/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') || '',
                    'Cookie': `sessionid=${getCookie('sessionid')}; csrftoken=${getCookie('csrftoken')}`
                },
                body: JSON.stringify({
                    asked_questions: quizQuestions,
                    answers: finalAnswers,
                    style: selectedStyle,
                    width: selectedDevice === 'mobile' ? 1024 : 1792,
                    height: selectedDevice === 'mobile' ? 1792 : 1024
                })
            })
            const data = await response.json()
            setNewImageData(data)
            console.log(data)
        } finally {
            setIsResultImageLoading(false)
            setQuizDone(true)
        }
    }

    return (
        <div className="mx-auto flex flex-col gap-2 sm:gap-4 w-full">
            {!isResultImageLoading && (
                <>
                    <div className="text-white font-bold text-base sm:text-xl mt-6 sm:mt-10 mb-3 sm:mb-5">
                        {currentQuestionIndex + 1}/{quizQuestions.length}
                    </div>
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-lg font-bold">
                        {quizQuestions[currentQuestionIndex]}
                    </div>
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div>
                            <textarea
                                value={currentAnswer}
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                className="w-full p-2 bg-white/10 rounded-md text-white text-sm sm:text-base"
                                rows={4}
                                placeholder="Type your answer here..."
                            />
                        </div>
                    </div>
                </>
            )}
            {currentQuestionIndex === quizQuestions.length - 1 ? (
                <>
                    <button
                        onClick={handleGenerate}
                        className="w-full sm:w-auto sm:px-8 mx-auto bg-green-600 hover:scale-105 sm:hover:scale-110 transition-transform duration-200 text-white font-bold py-2 rounded-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={isResultImageLoading}
                    >
                        {isResultImageLoading ? (
                            <LoadingSpinner size={5} text="Loading..." />
                        ) : (
                            'Generate'
                        )}
                    </button>
                    {isResultImageLoading && (
                        <p className="text-yellow-400 text-sm text-center mt-2">
                            Please stay on this page while we generate your wallpaper...
                        </p>
                    )}
                </>
            ) : (
                <button
                    onClick={handleNext}
                    className="w-full sm:w-auto sm:px-8 mx-auto bg-accent hover:scale-105 sm:hover:scale-110 transition-transform duration-200 text-white font-bold py-2 rounded-lg text-sm sm:text-base"
                >
                    Next Question
                </button>
            )}
        </div>
    )
}

export default QuizPanel
