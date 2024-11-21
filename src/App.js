import React, { useState, useEffect } from 'react';
import './index.css';


// Quiz Questions
const questions = [
  {
    question: 'What does PHP stand for?',
    options: ['A) Personal Home Page', 'B) Hypertext Pre Processor', 'C) Private Home Page', 'D) Public Hypertext Processor'],
    answer: 'B'
},
{
    question: 'What is the correct syntax to output "Hello World" in PHP?',
    options: ['A) echo "Hello World";', 'B) print "Hello World";', 'C) console.log("Hello World");', 'D) printf("Hello World");'],
    answer: 'A'
},
{
    question: 'Which SQL statement is used to extract data from a database?',
    options: ['A) SELECT', 'B) GET', 'C) EXTRACT', 'D) PULL'],
    answer: 'A'
},
{
    question: 'In MySQL, which keyword is used to sort the result-set in ascending order?',
    options: ['A) SORT BY', 'B) ORDER BY', 'C) ASCENDING BY', 'D) ARRANGE BY'],
    answer: 'B'
},
{
    question: 'Which of the following is NOT a valid JavaScript data type?',
    options: ['A) String', 'B) Boolean', 'C) Decimal', 'D) Undefined'],
    answer: 'C'
},
{
    question: 'How do you declare a variable in JavaScript?',
    options: ['A) var myVar;', 'B) let myVar;', 'C) const myVar;', 'D) All of the above'],
    answer: 'D'
},
{
    question: 'In React.js, what is used to pass data to a component from its parent?',
    options: ['A) State', 'B) Props', 'C) Context', 'D) Reducer'],
    answer: 'B'
},
{
    question: 'Which method is used to change the state of a component in React.js?',
    options: ['A) setState()', 'B) updateState()', 'C) changeState()', 'D) modifyState()'],
    answer: 'A'
},
{
    question: 'In React.js, what does JSX stand for?',
    options: ['A) JavaScript XML', 'B) Java Syntax Extension', 'C) JavaScript XML Script', 'D) None of the above'],
    answer: 'A'
},
{
    question: 'What is the purpose of the __init__ method in Python?',
    options: ['A) To initialize the object with default values', 'B) To define the class', 'C) To initialize variables', 'D) To initialize the class before it is used'],
    answer: 'A'
},
{
    question: 'What is the output of `print("Hello" + " World")` in Python?',
    options: ['A) Hello World', 'B) HelloWorld', 'C) Hello + World', 'D) Error'],
    answer: 'A'
},
{
    question: 'Which of the following is used to create a Python virtual environment?',
    options: ['A) virtualenv', 'B) venv', 'C) pythonenv', 'D) pipenv'],
    answer: 'B'
},
{
    question: 'Which command is used to install packages in Node.js?',
    options: ['A) npm', 'B) node install', 'C) node package manager', 'D) npm install'],
    answer: 'D'
},
{
    question: 'Which method is used to create a server in Node.js?',
    options: ['A) http.createServer()', 'B) server.create()', 'C) node.createServer()', 'D) createServer()'],
    answer: 'A'
},
{
    question: 'What does the `this` keyword refer to in JavaScript?',
    options: ['A) The global object', 'B) The object calling the function', 'C) The current object in the scope', 'D) None of the above'],
    answer: 'C'
},
{
    question: 'What is the correct way to add a comment in JavaScript?',
    options: ['A) /* comment */', 'B) // comment', 'C) <!-- comment -->', 'D) Both A and B'],
    answer: 'D'
},
{
    question: 'Which command is used to create a new Node.js project?',
    options: ['A) node init', 'B) npm new', 'C) npm init', 'D) npm start'],
    answer: 'C'
},
{
    question: 'What is a promise in JavaScript?',
    options: ['A) A way to handle synchronous code', 'B) A way to handle errors', 'C) A placeholder for a future value', 'D) None of the above'],
    answer: 'C'
},
{
    question: 'In React.js, what is the purpose of the `componentDidMount` lifecycle method?',
    options: ['A) It is called before the component is mounted', 'B) It is called after the component is mounted', 'C) It is called when the component is updated', 'D) It is called when the component is unmounted'],
    answer: 'B'
},
{
    question: 'Which of the following is used to connect a Node.js application to a MySQL database?',
    options: ['A) express-mysql', 'B) mysql2', 'C) mysql', 'D) both B and C'],
    answer: 'D'
}
];

export default function QuizApp() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [totalQuizTime, setTotalQuizTime] = useState(30 * 60);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentView, setCurrentView] = useState('home');
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [timer, setTimer] = useState(null);

    // Timer Formatting Function
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Start Quiz
    const startQuiz = () => {
        setCurrentView('quiz');
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setTotalQuizTime(30 * 60);
        
        // Start Timer
        const timerId = setInterval(() => {
            setTotalQuizTime(prev => {
                if (prev <= 0) {
                    clearInterval(timerId);
                    showFeedback();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        setTimer(timerId);
    };

    // Handle Option Selection
    const handleOptionSelect = (optionKey) => {
        setSelectedOption(optionKey);
    };

    // Next Question
    const nextQuestion = () => {
        if (!selectedOption) {
            alert('Please select an option!');
            return;
        }

        // Check if answer is correct
        const currentQuestion = questions[currentQuestionIndex];
        const newUserAnswers = [...userAnswers, selectedOption];
        setUserAnswers(newUserAnswers);

        if (selectedOption === currentQuestion.answer) {
            setScore(prev => prev + 1);
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect!');
        }

        // Move to next question or end quiz
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            showFeedback();
        }
    };

    // Show Feedback
    const showFeedback = () => {
        if (timer) clearInterval(timer);
        setCurrentView('feedback');
    };

    // Show Results
    const showResults = () => {
        setCurrentView('results');
    };

    // Restart Quiz
    const restartQuiz = () => {
        startQuiz();
    };

    // Return to Home
    const goHome = () => {
        if (timer) clearInterval(timer);
        setCurrentView('home');
    };

    // Render Views
    const renderHomeView = () => (
        <div className="w-full max-w-md text-center bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Tech Quiz Challenge</h2>
            <button 
                onClick={startQuiz} 
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            >
                Start Quiz
            </button>
        </div>
    );

    const renderQuizView = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

        
        return (
            <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-white">Quiz Game</h2>
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
                    <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="text-center mb-4 text-gray-300">Time Left: {formatTime(totalQuizTime)}</div>
                <div className="mb-4">
                    <p className="font-bold mb-2 text-white">{currentQuestion.question}</p>
                    {currentQuestion.options.map(option => (
                        <button 
                            key={option[0]} 
                            className={`w-full mb-2 py-2 rounded text-left 
                                ${selectedOption === option[0] 
                                    ? 'bg-blue-800 text-white' 
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                            onClick={() => handleOptionSelect(option[0])}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {feedback && (
                    <div className={`text-center font-bold mb-4 
                        ${feedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
                        {feedback}
                    </div>
                )}
                <div className="flex justify-between">
                    <button 
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded disabled:opacity-50"
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    <button 
                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                        onClick={nextQuestion}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        );
    };

    const renderFeedbackView = () => (
        <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Quiz Review</h2>
            <div className="max-h-[60vh] overflow-y-auto">
                {questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === question.answer;
                    
                    return (
                        <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
                            <p className="font-bold mb-2 text-white">Question {index + 1}: {question.question}</p>
                            <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                                Your Answer: {question.options.find(opt => opt[0] === userAnswer)?.slice(3)}
                            </p>
                            {!isCorrect && (
                                <p className="text-green-500">
                                    Correct Answer: {question.options.find(opt => opt[0] === question.answer)?.slice(3)}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-4">
                <button 
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={showResults}
                >
                    Show Final Results
                </button>
            </div>
        </div>
    );

    const renderResultsView = () => (
        <div className="w-full max-w-md text-center bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
            <p className="text-xl mb-4 text-gray-300">
                You scored {score} out of {questions.length}
            </p>
            <div className="flex justify-center gap-4">
                <button 
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={restartQuiz}
                >
                    Restart Quiz
                </button>
                <button 
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded hover:bg-gray-700"
                    onClick={goHome}
                >
                    Go Home
                </button>
            </div>
        </div>
    );

    // Main Render
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
            {currentView === 'home' && renderHomeView()}
            {currentView === 'quiz' && renderQuizView()}
            {currentView === 'feedback' && renderFeedbackView()}
            {currentView === 'results' && renderResultsView()}
        </div>
    );
}