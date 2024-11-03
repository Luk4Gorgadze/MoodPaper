'use client'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/Container'
import QuizStarter from '../components/QuizStarter'
import QuizPanel from '../components/QuizPanel'
import Image from 'next/image'
import ImageResultPanel from '../components/ImageResultPanel'
import { getCookie } from '../utils/cookies'
import { checkAuthStatus } from '@/app/utils/auth'

export default function Generate() {
    const {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        generatedImageTitle,
        setGeneratedImageTitle,
        selectedDevice,
        setSelectedDevice,
        isQuizOpen,
        setIsQuizOpen,
        quizQuestions,
        setQuizQuestions,
        userAnswers,
        currentAnswer,
        setCurrentAnswer,
        setUserAnswers,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        isImagePublic,
        setIsImagePublic,
        quizDone,
        setQuizDone,
        newImageData,
        setNewImageData,
        isResultImageLoading,
        setIsResultImageLoading,
        availableTokens,
        setAvailableTokens
    } = useContext(AuthContext)

    // Remove the local state declarations since they're now in context

    useEffect(() => {
        // Check only when component mounts
        checkAuthStatus(setIsAuthenticated, setUser)
    }, []);


    useEffect(() => {
        if (isAuthenticated) {
            const refreshTokens = async () => {
                try {
                    const userData = await checkAuthStatus(setIsAuthenticated, setUser)
                    setAvailableTokens(userData?.subscription?.tokens_count || 0)
                } catch (error) {
                    console.error('Error refreshing token count:', error)
                }
            }

            // Initial check
            refreshTokens()

            // Set up polling every 30 seconds
            const interval = setInterval(refreshTokens, 30000)

            // Cleanup on unmount
            return () => clearInterval(interval)
        }
    }, [isAuthenticated, setIsAuthenticated, setUser, setUserAnswers])

    return (
        <main className="flex w-full min-h-screen flex-col justify-between text-white mt-10">
            <div className="">

                {!isAuthenticated ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Generate Images</h1>
                        <p className="mb-4">Please log in to generate images.</p>
                    </div>
                ) : availableTokens === 0 && quizQuestions.length === 0 ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Generate Images</h1>
                        <p className="mb-4">To generate images you need to buy tokens.</p>
                        <Link href="/pricing" className="text-accent hover:text-blue-700">
                            View Pricing Plans
                        </Link>
                    </div>
                ) : (
                    <div className='w-full mx-auto'>
                        <h1 className="text-xl font-bold mb-4 text-gray-400">Available tokens: {availableTokens}</h1>
                        {!isQuizOpen ? (
                            <QuizStarter
                                selectedDevice={selectedDevice}
                                setSelectedDevice={setSelectedDevice}
                                isQuizOpen={isQuizOpen}
                                setIsQuizOpen={setIsQuizOpen}
                                setQuizQuestions={setQuizQuestions}
                                setQuizDone={setQuizDone}
                            />
                        ) : quizDone ? (
                            <ImageResultPanel
                                key={newImageData.image_url}
                                isPublic={isImagePublic}
                                setIsPublic={setIsImagePublic}
                                currentQuestionIndex={currentQuestionIndex}
                                quizQuestions={quizQuestions}
                                userAnswers={userAnswers}
                                setCurrentQuestionIndex={setCurrentQuestionIndex}
                                setQuizQuestions={setQuizQuestions}
                                setUserAnswers={setUserAnswers}
                                setIsQuizOpen={setIsQuizOpen}
                                newImageData={newImageData}
                            />
                        ) : (
                            <QuizPanel
                                quizQuestions={quizQuestions}
                                userAnswers={userAnswers}
                                currentAnswer={currentAnswer}
                                currentQuestionIndex={currentQuestionIndex}
                                setCurrentQuestionIndex={setCurrentQuestionIndex}
                                setCurrentAnswer={setCurrentAnswer}
                                setUserAnswers={setUserAnswers}
                                setQuizDone={setQuizDone}
                                selectedDevice={selectedDevice}
                                setGeneratedImageTitle={setGeneratedImageTitle}
                                setNewImageData={setNewImageData}
                                isResultImageLoading={isResultImageLoading}
                                setIsResultImageLoading={setIsResultImageLoading}
                            />
                        )}
                    </div>
                )}
            </div>
        </main >
    )
}
