import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const QuizPlayerPage: React.FC = () => {
  const {
    activeQuiz,
    submitQuizAttempt,
    navigateTo
  } = useApp();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    totalMarks: number;
    percentage: number;
    isPassed: boolean;
  } | null>(null);

  useEffect(() => {
    if (!activeQuiz) return;
    setTimeLeftSeconds(activeQuiz.durationMinutes * 60);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setScoreResult(null);
  }, [activeQuiz]);

  // Timer Countdown
  useEffect(() => {
    if (isSubmitted || !activeQuiz || timeLeftSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds, isSubmitted, activeQuiz]);

  if (!activeQuiz) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold">No Active Quiz Selected</h2>
        <button
          onClick={() => navigateTo('dashboard')}
          className="mt-4 px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const currentQ = activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleAutoSubmit = () => {
    let earnedMarks = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        earnedMarks += q.marks;
      }
    });

    const percent = Math.round((earnedMarks / activeQuiz.totalMarks) * 100);
    const passed = percent >= activeQuiz.passingScorePercent;

    const result = {
      score: earnedMarks,
      totalMarks: activeQuiz.totalMarks,
      percentage: percent,
      isPassed: passed
    };

    setScoreResult(result);
    setIsSubmitted(true);
    submitQuizAttempt(activeQuiz.id, earnedMarks, activeQuiz.totalMarks, percent);
  };

  const handleManualSubmit = () => {
    handleAutoSubmit();
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(activeQuiz.durationMinutes * 60);
    setIsSubmitted(false);
    setScoreResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Timer */}
        <div className="bg-slate-900 border border-blue-900/40 rounded-3xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-950 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded border border-blue-800">
                Class {activeQuiz.classLevel} • {activeQuiz.subjectName}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{activeQuiz.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Chapter Speed & Mastery Test
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div className="flex items-center gap-2 bg-slate-950 border border-blue-800/60 px-4 py-2 rounded-2xl text-cyan-300 font-mono text-sm font-black">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            )}

            <button
              onClick={() => navigateTo('dashboard')}
              className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 cursor-pointer"
            >
              Exit Test
            </button>
          </div>
        </div>

        {/* Results Screen */}
        {isSubmitted && scoreResult ? (
          <div className="bg-slate-900 border border-blue-800/60 rounded-3xl p-8 shadow-2xl space-y-8 animate-in fade-in duration-300 text-center">
            <div className="w-20 h-20 rounded-3xl bg-blue-950 border-2 border-cyan-400 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <Award className="w-10 h-10 text-cyan-400" />
            </div>

            <div>
              <span
                className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                  scoreResult.isPassed
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                }`}
              >
                {scoreResult.isPassed ? 'Test Passed 🎉' : 'Needs Practice'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                Your Score: {scoreResult.score} / {scoreResult.totalMarks} ({scoreResult.percentage}%)
              </h2>

              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                {scoreResult.isPassed
                  ? 'Outstanding work! Your fundamental understanding of this chapter matches board topper standards.'
                  : 'Good attempt! Review the question explanations below to fix step calculation errors and retake.'}
              </p>
            </div>

            {/* Questions Detailed Breakdown */}
            <div className="text-left space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-base font-extrabold text-white">Answer Key & Detailed Explanations:</h3>

              <div className="space-y-4">
                {activeQuiz.questions.map((q, qIndex) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctOptionIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl border ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-rose-950/20 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-bold text-sm text-white">
                          Q{qIndex + 1}: {q.questionText}
                        </p>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> Correct (+{q.marks})
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-rose-400 font-bold shrink-0">
                            <XCircle className="w-4 h-4" /> Incorrect (0/{q.marks})
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = studentAns === optIndex;
                          const isActualCorrect = optIndex === q.correctOptionIndex;

                          let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-400';
                          if (isActualCorrect) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 font-bold';
                          } else if (isSelected && !isActualCorrect) {
                            btnStyle = 'bg-rose-950/80 border-rose-500/60 text-rose-300 font-bold';
                          }

                          return (
                            <div key={optIndex} className={`p-2.5 rounded-xl border text-xs ${btnStyle}`}>
                              {opt} {isActualCorrect && '✓ (Correct)'} {isSelected && !isActualCorrect && '✗ (Your choice)'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                        <span className="font-bold text-cyan-300">Teacher Solution: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Post-quiz Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-800">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-attempt Quiz</span>
              </button>

              <button
                onClick={() => navigateTo('dashboard')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Back to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Active Question Step Layout */
          <div className="bg-slate-900 border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Progress Counter */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className="text-cyan-400 font-bold">{currentQ.marks} Marks</span>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.questionText}
              </h2>

              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIndex;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(optIndex)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-950 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Stepper Controls */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-30 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((i) => Math.min(totalQuestions - 1, i + 1))}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleManualSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Submit & View Results
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
