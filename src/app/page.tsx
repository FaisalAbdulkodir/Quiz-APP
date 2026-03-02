"use client";

import { useState } from "react";
import type { QuizItem } from "@/types/quiz";
import quizData from "@/data/quiz.json";

// Type assertion for the imported JSON
const typedQuizData: QuizItem[] = quizData as QuizItem[];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<
    "BENAR" | "SALAH" | null
  >(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion: QuizItem = typedQuizData[currentIndex];
  const totalQuestions: number = typedQuizData.length;

  const handleAnswer = (answer: "BENAR" | "SALAH"): void => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.tipe) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = (): void => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const restartQuiz = (): void => {
    setCurrentIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getScorePercentage = (): number => {
    return Math.round((score / totalQuestions) * 100);
  };

  if (quizFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Quiz Complete! 🎉
          </h1>
          <div className="text-6xl font-bold mb-6 text-blue-600">
            {score}/{totalQuestions}
          </div>
          <p className="text-xl mb-8 text-zinc-600 dark:text-zinc-400">
            You got {getScorePercentage()}% correct
          </p>
          <button
            onClick={restartQuiz}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <main className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Quiz App</h1>
            <div className="text-sm">
              Question {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div className="w-full bg-blue-400 h-2 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-8">
            {currentQuestion.question}
          </h2>

          {/* Answer Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleAnswer("BENAR")}
              disabled={showResult}
              className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                showResult
                  ? currentQuestion.tipe === "BENAR"
                    ? "bg-green-500 text-white"
                    : selectedAnswer === "BENAR"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400"
                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
              }`}
            >
              ✓ BENAR
            </button>
            <button
              onClick={() => handleAnswer("SALAH")}
              disabled={showResult}
              className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                showResult
                  ? currentQuestion.tipe === "SALAH"
                    ? "bg-green-500 text-white"
                    : selectedAnswer === "SALAH"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
              }`}
            >
              ✗ SALAH
            </button>
          </div>

          {/* Result Modal */}
          {showResult && (
            <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-zinc-800 border-2 border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {selectedAnswer === currentQuestion.tipe ? "✅" : "❌"}
                </div>
                <div className="flex-1">
                  {/* <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                    {selectedAnswer === currentQuestion.tipe
                      ? "BENAR!"
                      : `SALAH! Jawaban yang benar adalaah ${currentQuestion.tipe}`}
                  </h3> */}
                  {currentQuestion.answer && (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {currentQuestion.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Explanation Button */}
          {/* {currentQuestion.answer && !showResult && (
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="mb-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {showAnswer ? "Sembunyikan" : "Tampilkan"} Penjelasan
            </button>
          )} */}

          {/* Explanation */}
          {showAnswer && currentQuestion.answer && !showResult && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-800 dark:text-blue-300">
              {currentQuestion.answer}
            </div>
          )}

          {/* Score Display */}
          {/* <div className="mt-4 text-right text-zinc-600 dark:text-zinc-400">
            Score: {score}
          </div> */}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {currentIndex === totalQuestions - 1 ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
