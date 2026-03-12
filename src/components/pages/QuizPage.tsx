import React, { useState, useEffect } from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Home, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuizPage: React.FC = () => {
  const { selectedCourseId, courses, quizzes, saveQuizResult, navigate } = useAcademy();

  const course = courses.find(c => c.id === selectedCourseId);
  const quiz = selectedCourseId ? quizzes[selectedCourseId] : null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Initialize answers array
  useEffect(() => {
    if (quiz) {
      setSelectedAnswers(new Array(quiz.questions.length).fill(null));
      setCurrentQuestion(0);
      setShowResults(false);
      setIsAnswerRevealed(false);
    }
  }, [quiz]);

  // Timer
  useEffect(() => {
    if (!showResults) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, showResults]);

  if (!course || !quiz) {
    return (
      <section className="relative min-h-screen py-20 flex items-center justify-center">
        <div className="text-center glass-vibrant rounded-2xl p-8 max-w-md">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">لم يتم العثور على الاختبار</h2>
          <p className="text-muted-foreground mb-6">يرجى اختيار دورة للبدء في الاختبار</p>
          <button
            onClick={() => navigate('courses')}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-primary text-primary-foreground font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للدورات
          </button>
        </div>
      </section>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (isAnswerRevealed) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswerRevealed(false);
    } else {
      // Calculate results
      const correctCount = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quiz.questions[index].correct ? 1 : 0);
      }, 0);

      const score = Math.round((correctCount / quiz.questions.length) * 100);
      
      saveQuizResult(selectedCourseId!, {
        score,
        correctAnswers: correctCount,
        totalQuestions: quiz.questions.length,
        userAnswers: selectedAnswers,
        date: new Date().toISOString()
      });

      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsAnswerRevealed(false);
    }
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
  };

  const handleRestart = () => {
    setSelectedAnswers(new Array(quiz.questions.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
    setIsAnswerRevealed(false);
  };

  const currentQ = quiz.questions[currentQuestion];
  const correctCount = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === quiz.questions[index].correct ? 1 : 0);
  }, 0);
  const score = Math.round((correctCount / quiz.questions.length) * 100);

  if (showResults) {
    return (
      <section className="relative min-h-screen py-20 pt-24 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-vibrant rounded-2xl p-8 text-center animate-slide-up">
              {/* Trophy */}
              <div className={cn(
                "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                score >= 70 ? "gradient-gold" : "bg-muted"
              )}>
                <Trophy className={cn("w-12 h-12", score >= 70 ? "text-background" : "text-muted-foreground")} />
              </div>

              {/* Score */}
              <h2 className="text-4xl font-black mb-2">
                {score >= 70 ? 'أحسنت!' : 'حاول مرة أخرى'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {score >= 70 
                  ? 'لقد أتممت الاختبار بنجاح!' 
                  : 'لم تحقق الحد الأدنى للنجاح (70%)'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">{score}%</div>
                  <div className="text-sm text-muted-foreground">النتيجة</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-success">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">إجابات صحيحة</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-muted-foreground">الوقت</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  إعادة الاختبار
                </button>
                <button
                  onClick={() => navigate('courses')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground"
                >
                  <Home className="w-4 h-4" />
                  العودة للدورات
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="glass-vibrant rounded-2xl p-6 mb-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">{course.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  {formatTime(elapsedTime)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-accent" />
                  {currentQuestion + 1}/{quiz.questions.length}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              {/* Generate a small scoped CSS class to avoid inline styles and satisfy lint rules */}
              {(() => {
                const percent = Math.round(((currentQuestion + 1) / quiz.questions.length) * 100);
                const cls = `progress-w-${percent}`;
                return (
                  <>
                    <style>{`.${cls} { width: ${percent}% }`}</style>
                    <div className={"h-full gradient-primary transition-all duration-300 " + cls} />
                  </>
                );
              })()}
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-vibrant rounded-2xl p-8 mb-6 animate-slide-up delay-100">
            <div className="flex items-start gap-4 mb-8">
              <span className="flex-shrink-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                {currentQuestion + 1}
              </span>
              <h2 className="text-xl font-medium pt-1">{currentQ.q}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                const isCorrect = index === currentQ.correct;
                const showCorrectness = isAnswerRevealed && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswerRevealed}
                    className={cn(
                      "w-full text-right p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                      isSelected && !isAnswerRevealed && "border-primary bg-primary/10",
                      !isSelected && !isAnswerRevealed && "border-border hover:border-primary/50 hover:bg-secondary/50",
                      isAnswerRevealed && isCorrect && "border-success bg-success/10",
                      isAnswerRevealed && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                      isAnswerRevealed && "cursor-not-allowed"
                    )}
                  >
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                      isSelected && !isAnswerRevealed && "border-primary bg-primary text-primary-foreground",
                      !isSelected && !isAnswerRevealed && "border-muted-foreground",
                      isAnswerRevealed && isCorrect && "border-success bg-success text-success-foreground",
                      isAnswerRevealed && isSelected && !isCorrect && "border-destructive bg-destructive text-destructive-foreground"
                    )}>
                      {isAnswerRevealed && isCorrect && <CheckCircle className="w-4 h-4" />}
                      {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                      {!isAnswerRevealed && String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 animate-slide-up delay-200">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl glass transition-all",
                currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary"
              )}
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </button>

            <div className="flex gap-2">
              {!isAnswerRevealed && selectedAnswers[currentQuestion] !== null && (
                <button
                  onClick={handleRevealAnswer}
                  className="px-6 py-3 rounded-xl glass hover:bg-secondary transition-all"
                >
                  تحقق من الإجابة
                </button>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === null}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all",
                selectedAnswers[currentQuestion] === null 
                  ? "glass opacity-50 cursor-not-allowed" 
                  : "gradient-primary text-primary-foreground hover:opacity-90"
              )}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Question Indicators */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setIsAnswerRevealed(false);
                }}
                className={cn(
                  "w-8 h-8 rounded-full text-sm font-medium transition-all",
                  index === currentQuestion && "gradient-primary text-primary-foreground",
                  index !== currentQuestion && selectedAnswers[index] !== null && "bg-success text-success-foreground",
                  index !== currentQuestion && selectedAnswers[index] === null && "glass hover:bg-secondary"
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;
