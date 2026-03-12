import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import CourseCard from './CourseCard';
import { Sparkles, Globe, Smartphone, Server, ArrowLeft } from 'lucide-react';

const CoursesSection: React.FC = () => {
  const { courses, navigate } = useAcademy();

  const featuredCourses = courses.slice(0, 4);
  const webCourses = courses.filter(c => c.category === 'web').slice(0, 3);
  const appCourses = courses.filter(c => c.category === 'app').slice(0, 3);
  const backendCourses = courses.filter(c => c.category === 'backend').slice(0, 3);

  const devSections = [
    {
      id: 'web',
      icon: Globe,
      title: 'الفرونت إند',
      subtitle: 'تعلم بناء مواقع وتطبيقات ويب احترافية بأحدث التقنيات',
      courses: webCourses,
      color: 'bg-primary',
    },
    {
      id: 'app',
      icon: Smartphone,
      title: 'التطبيقات',
      subtitle: 'تعلم بناء تطبيقات الموبايل لأندرويد وآيفون من الصفر',
      courses: appCourses,
      color: 'bg-secondary',
    },
    {
      id: 'backend',
      icon: Server,
      title: 'الباك إند',
      subtitle: 'تعلم بناء APIs وقواعد البيانات وبنية الخوادم',
      courses: backendCourses,
      color: 'bg-accent',
    },
  ];

  return (
    <div className="space-y-24">
      {/* Featured Courses */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Background Decoration - Solid Colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">الكورسات المميزة</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              ابدأ رحلتك مع أفضل الكورسات
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من الكورسات المصممة خصيصاً لمساعدتك على النجاح في مجال التقنية
            </p>
          </div>

          {/* Featured Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('courses')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary-dark hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              عرض جميع الكورسات
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Development Sections */}
      {devSections.map((section, sectionIndex) => {
        const Icon = section.icon;
        return (
          <section
            key={section.id}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-14 h-14 ${section.color} rounded-2xl flex items-center justify-center shadow-soft`}>
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{section.title}</h3>
                <p className="text-muted-foreground">{section.subtitle}</p>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index + sectionIndex * 3}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CoursesSection;
