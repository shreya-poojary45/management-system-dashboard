import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { LayoutDashboard, BookOpen, Award, Clock, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, enrolledCourses, progress, courses, quizResults } = useAcademy();

  const enrolledCoursesData = courses.filter(c => enrolledCourses.includes(c.id));
  const completedCourses = enrolledCoursesData.filter(c => (progress[c.id] || 0) >= 100);
  const totalProgress = enrolledCoursesData.length > 0
    ? Math.round(enrolledCoursesData.reduce((acc, c) => acc + (progress[c.id] || 0), 0) / enrolledCoursesData.length)
    : 0;

  const stats = [
    { label: 'الكورسات المسجلة', value: enrolledCourses.length, icon: BookOpen, color: 'bg-primary' },
    { label: 'الكورسات المكتملة', value: completedCourses.length, icon: Award, color: 'bg-success' },
    { label: 'متوسط التقدم', value: `${totalProgress}%`, icon: TrendingUp, color: 'bg-secondary' },
    { label: 'الاختبارات المجتازة', value: Object.keys(quizResults).length, icon: Clock, color: 'bg-tertiary' },
  ];

  return (
    <section className="relative min-h-screen py-20">
      {/* Background - Solid Colors */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">لوحة التحكم</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            مرحباً {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            تابع تقدمك وأدِر رحلتك التعليمية من هنا
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-vibrant rounded-2xl p-6 hover-lift"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">كورساتي</h2>
          
          {enrolledCoursesData.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesData.map((course) => {
                const courseProgress = progress[course.id] || 0;
                return (
                  <div key={course.id} className="glass-vibrant rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                        <i className={`${course.icon} text-xl text-primary-foreground`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.level}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">التقدم</span>
                        <span className="text-primary font-semibold">{courseProgress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-700"
                          style={{ width: `${courseProgress}%` }}
                        />
                      </div>
                    </div>

                    {courseProgress >= 100 && (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <Award className="w-4 h-4" />
                        <span>مكتمل!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 glass-vibrant rounded-2xl">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">لم تسجل في أي كورس بعد</p>
              <p className="text-muted-foreground text-sm mt-2">ابدأ رحلتك التعليمية الآن!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
