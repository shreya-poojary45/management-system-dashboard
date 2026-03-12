import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import CourseCard from '../courses/CourseCard';
import ExamsSection from '@/components/courses/ExamsSection';
import { GraduationCap, Search, Filter } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const { courses, selectedCourseId, progress, courseCategoryFilter, setCourseCategoryFilter } = useAcademy();
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState<string>(courseCategoryFilter || 'all');

  React.useEffect(() => {
    // Keep local category in sync when some other page sets the global filter (e.g., Paths page)
    setCategory(courseCategoryFilter || 'all');
  }, [courseCategoryFilter]);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'web', label: 'فرونت إند' },
    { id: 'app', label: 'التطبيقات' },
    { id: 'backend', label: 'باك إند' },
    { id: 'ai', label: 'الذكاء الاصطناعي' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.includes(search) || course.description.includes(search);
    const matchesCategory = category === 'all' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative min-h-screen py-20">
      {/* Background - Solid Colors */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">جميع الكورسات</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            اكتشف مكتبتنا التعليمية
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تصفح جميع الكورسات المتاحة واختر ما يناسب مستواك وأهدافك
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن كورس..."
              className="w-full pr-12 pl-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.id}
            onClick={() => { setCategory(cat.id); setCourseCategoryFilter(cat.id); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  category === cat.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Exams Section (appears when a completed course is selected) */}
        {selectedCourseId !== null && progress[selectedCourseId] >= 100 && (
          <ExamsSection courseId={selectedCourseId} />
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">لا توجد كورسات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesPage;
