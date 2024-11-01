'use client'
import React, { useState, createContext, useEffect } from 'react';
import Header from './Header';
import { User } from '@/app/utils/types';
import { checkAuthStatus } from '../utils/auth';

interface AuthContextType {
    user: User | null;
    setUser: (value: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    selectedDevice: 'mobile' | 'desktop';
    setSelectedDevice: (value: 'mobile' | 'desktop') => void;
    isQuizOpen: boolean;
    setIsQuizOpen: (value: boolean) => void;
    quizQuestions: string[];
    setQuizQuestions: (questions: string[]) => void;
    userAnswers: string[];
    setUserAnswers: (answers: string[]) => void;
    currentAnswer: string;
    setCurrentAnswer: (answer: string) => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    isImagePublic: boolean;
    setIsImagePublic: (value: boolean) => void;
    quizDone: boolean;
    setQuizDone: (value: boolean) => void;
    generatedImageTitle: string;
    setGeneratedImageTitle: (value: string) => void;
    newImageData: any;
    setNewImageData: (value: any) => void;
    isResultImageLoading: boolean;
    setIsResultImageLoading: (loading: boolean) => void;
    selectedStyle: string | null;
    setSelectedStyle: (style: string | null) => void;
    availableTokens: number;
    setAvailableTokens: (tokens: number) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    selectedDevice: 'desktop',
    setSelectedDevice: () => { },
    isQuizOpen: false,
    setIsQuizOpen: () => { },
    quizQuestions: [],
    setQuizQuestions: () => { },
    userAnswers: [],
    setUserAnswers: () => { },
    currentAnswer: '',
    setCurrentAnswer: () => { },
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: () => { },
    isImagePublic: false,
    setIsImagePublic: () => { },
    quizDone: false,
    setQuizDone: () => { },
    generatedImageTitle: '',
    setGeneratedImageTitle: () => { },
    newImageData: null,
    setNewImageData: () => { },
    isResultImageLoading: false,
    setIsResultImageLoading: () => { },
    selectedStyle: null,
    setSelectedStyle: () => { },
    availableTokens: 0,
    setAvailableTokens: () => { },
});

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'desktop'>('desktop');
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isImagePublic, setIsImagePublic] = useState(false);
    const [quizDone, setQuizDone] = useState(false);
    const [generatedImageTitle, setGeneratedImageTitle] = useState('');
    const [newImageData, setNewImageData] = useState(null);
    const [isResultImageLoading, setIsResultImageLoading] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<string | null>('Any');
    const [availableTokens, setAvailableTokens] = useState(0);
    useEffect(() => {
        // Check only when component mounts
        checkAuthStatus(setIsAuthenticated, setUser)
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const initAuth = async () => {
                const userData = await checkAuthStatus(setIsAuthenticated, setUser)
                setAvailableTokens(userData?.subscription?.tokens_count || 0)
            }
            initAuth()
        }
    }, [isAuthenticated])


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            selectedDevice,
            setSelectedDevice,
            isQuizOpen,
            setIsQuizOpen,
            quizQuestions,
            setQuizQuestions,
            userAnswers,
            setUserAnswers,
            currentAnswer,
            setCurrentAnswer,
            currentQuestionIndex,
            setCurrentQuestionIndex,
            isImagePublic,
            setIsImagePublic,
            quizDone,
            setQuizDone,
            generatedImageTitle,
            setGeneratedImageTitle,
            newImageData,
            setNewImageData,
            isResultImageLoading,
            setIsResultImageLoading,
            selectedStyle,
            setSelectedStyle,
            availableTokens,
            setAvailableTokens
        }}>
            <div className={`container mx-auto px-10 sm:px-6 lg:px-20 mt-5 ${className}`}>
                <Header
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    user={user}
                    setUser={setUser}
                />
                {children}
            </div>
        </AuthContext.Provider>
    );
};

export default Container;
