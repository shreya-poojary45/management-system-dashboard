import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { HelpCircle } from 'lucide-react';

interface ExamsSectionProps {
  courseId: number;
}

const ExamsSection: React.FC<ExamsSectionProps> = ({ courseId }) => {
  const { courses, quizzes, navigate, setSelectedCourseId } = useAcademy();

  const course = courses.find(c => c.id === courseId);
  const quiz = quizzes[courseId];
  if (!course || !quiz) return null;

  const handleStartQuiz = () => {
    setSelectedCourseId(courseId);
    navigate('quiz');
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
          <HelpCircle className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">الاختبارات</h3>
          <p className="text-muted-foreground">تم فتح الاختبار لهذا الكورس. اختبر مهاراتك الآن!</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-vibrant rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-lg font-bold text-foreground">{quiz.title}</h4>
            <span className="text-sm text-muted-foreground">{quiz.questions.length} أسئلة</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{course.title}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300"
            >
              ابدأ الاختبار
            </button>
            <button
              onClick={() => setSelectedCourseId(null)}
              className="px-4 py-3 rounded-xl bg-card text-muted-foreground hover:bg-muted transition-all duration-300"
            >
              إخفاء
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;
