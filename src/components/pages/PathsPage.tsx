import React from 'react';
import { Route, Target, Sparkles } from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';

const paths = [
  { id: 1, title: 'مسار الفرونت إند', description: 'من HTML إلى React.js', courses: 5, duration: '60 ساعة', color: 'bg-primary', category: 'web' },
  { id: 2, title: 'مسار الباك إند', description: 'من Node.js إلى قواعد البيانات', courses: 4, duration: '50 ساعة', color: 'bg-secondary', category: 'backend' },
  { id: 3, title: 'مسار الذكاء الاصطناعي', description: 'من Python إلى Deep Learning', courses: 6, duration: '80 ساعة', color: 'bg-accent', category: 'ai' },
];

const PathsPage: React.FC = () => {
  const { setCourseCategoryFilter, navigate } = useAcademy();

  const openPath = (category: string) => {
    setCourseCategoryFilter(category);
    navigate('courses');
  };

  return (
    <section className="relative min-h-screen py-20 bg-background">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Route className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">المسارات التعليمية</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">اختر مسارك المهني</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <div key={path.id} className="glass-vibrant rounded-3xl p-8 hover-lift space-y-6">
              <div className={`w-16 h-16 ${path.color} rounded-2xl flex items-center justify-center`}>
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{path.title}</h3>
              <p className="text-muted-foreground">{path.description}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{path.courses} كورسات</span>
                <span>{path.duration}</span>
              </div>
              <button onClick={() => openPath(path.category)} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-dark transition-all">
                ابدأ المسار
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PathsPage;
