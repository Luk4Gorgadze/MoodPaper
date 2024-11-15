'use client'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { FC } from 'react'
import { getCookie } from '../utils/cookies'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from '../components/Container'
import { QuizQuestion } from '../utils/types'
// Add the QuizQuestion interface

interface QuizPanelProps {
    quizQuestions: QuizQuestion[]  // Updated type
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
    availableTokens: number
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
    setIsResultImageLoading,
    availableTokens
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
                    asked_questions: quizQuestions.map(q => q.question),  // Extract just the questions
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
        <div className={`mx-auto flex flex-col gap-2 sm:gap-4 w-full ${isResultImageLoading ? 'flex w-full min-h-screen flex-col justify-center text-white' : ''}`}>
            {!isResultImageLoading && (
                <>
                    <div className="text-white font-bold text-base sm:text-xl mt-6 sm:mt-10 mb-3 sm:mb-5">
                        {currentQuestionIndex + 1}/{quizQuestions.length}
                    </div>
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-lg font-bold">
                        {quizQuestions[currentQuestionIndex].question}
                    </div>
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex flex-col gap-4">
                            {/* Predefined answers */}
                            <div className="flex flex-col gap-2">
                                <p className="text-white/70 text-sm">Choose from options:</p>
                                {quizQuestions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentAnswer(answer)}
                                        className={`w-full p-3 rounded-lg text-left text-sm sm:text-base transition-colors duration-200 
                                            ${currentAnswer === answer
                                                ? 'bg-accent text-white'
                                                : 'bg-white/10 text-white hover:bg-white/20'}`}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-white/20 flex-grow"></div>
                                <span className="text-white/50 text-sm">or</span>
                                <div className="h-px bg-white/20 flex-grow"></div>
                            </div>

                            {/* Custom answer */}
                            <div className="flex flex-col gap-2">
                                <p className="text-white/70 text-sm">Type your own answer:</p>
                                <div className="relative">
                                    <textarea
                                        value={currentAnswer}
                                        onChange={(e) => {
                                            // Limit the input to 500 characters
                                            if (e.target.value.length <= 500) {
                                                setCurrentAnswer(e.target.value)
                                            }
                                        }}
                                        placeholder="Type your answer here..."
                                        maxLength={500}
                                        className="w-full p-3 rounded-lg text-sm sm:text-base bg-white/10 text-white 
                                            placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent
                                            min-h-[100px] resize-none"
                                    />
                                    <div className="absolute bottom-2 right-2 text-xs text-white/50">
                                        {currentAnswer.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {currentQuestionIndex === quizQuestions.length - 1 ? (
                <>
                    <button
                        onClick={handleGenerate}
                        className={`w-full sm:w-auto sm:px-8 mx-auto ${isResultImageLoading
                            ? 'bg-transparent'
                            : 'bg-gradient-to-r from-accent to-blue-900'
                            } text-white font-bold py-4 rounded-lg text-xl hover:opacity-80 transition-opacity relative overflow-hidden animate-gradient bg-[length:200%_100%] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50`}
                        disabled={isResultImageLoading || availableTokens === 0}
                    >
                        {isResultImageLoading ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <LoadingSpinner size={8} />
                                <span className="bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%] font-bold text-xl">
                                    Generating your image...
                                </span>
                            </div>
                        ) : availableTokens === 0 ? (
                            'No tokens available'
                        ) : (
                            'Generate'
                        )}
                    </button>
                    {isResultImageLoading && (
                        <p className="text-yellow-400 text-sm text-center mt-2">
                            Please stay on this page while we generate your wallpaper...
                        </p>
                    )}
                    {availableTokens === 0 && (
                        <p className="text-red-400 text-sm text-center mt-2">
                            You don't have any tokens left. Please purchase more tokens to generate images.
                        </p>
                    )}
                </>
            ) : (
                <button
                    onClick={handleNext}
                    className="w-full sm:w-auto sm:px-8 mx-auto bg-gradient-to-r from-accent to-blue-900 text-white font-bold py-4 rounded-lg text-xl hover:opacity-80 transition-opacity relative overflow-hidden animate-gradient bg-[length:200%_100%]"
                >
                    Next Question
                </button>
            )}
        </div>
    )
}

export default QuizPanel
