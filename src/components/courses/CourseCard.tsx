import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { Course } from '@/data/academyData';
import { cn } from '@/lib/utils';
import { Clock, Video, Play, ArrowLeft, ClipboardCheck, Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index = 0 }) => {
  const { progress, enrolledCourses, enrollCourse, setSelectedCourseId, setIsCourseModalOpen, navigate } = useAcademy();

  const courseProgress = progress[course.id] || 0;
  const isEnrolled = enrolledCourses.includes(course.id);
  const isCompleted = courseProgress >= 100;

  const getButtonText = () => {
    if (isCompleted) return 'اختبر نفسك';
    if (courseProgress > 0 || isEnrolled) return 'استكمال';
    return 'ابدأ الكورس';
  };

  const getButtonIcon = () => {
    if (isCompleted) return <ClipboardCheck className="w-4 h-4" />;
    if (courseProgress > 0) return <Play className="w-4 h-4" />;
    return <ArrowLeft className="w-4 h-4" />;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompleted) {
      navigate('quiz');
    } else {
      enrollCourse(course.id);
    }
  };

  const handleCardClick = () => {
    setSelectedCourseId(course.id);
    setIsCourseModalOpen(true);
  };

  const levelConfig = {
    'مبتدئ': { bg: 'bg-success/15', text: 'text-success', border: 'border-success/30' },
    'متوسط': { bg: 'bg-warning/15', text: 'text-warning', border: 'border-warning/30' },
    'متقدم': { bg: 'bg-destructive/15', text: 'text-destructive', border: 'border-destructive/30' },
  };

  const config = levelConfig[course.level];

  return (
    <div
      onClick={handleCardClick}
      className={`group relative glass-vibrant rounded-3xl p-6 cursor-pointer card-interactive overflow-hidden animate-fade-in-up ani-delay-${index}`}
    >
      {/* Hover Overlay - Solid Color */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      <div className="relative z-10 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-500">
            <i className={`${course.icon} text-2xl text-primary-foreground`} />
          </div>
          
          <div className={cn("px-3 py-1.5 rounded-full text-xs font-semibold border", config.bg, config.text, config.border)}>
            {course.level}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4 text-secondary" />
            <span>{course.lessons} درس</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Progress Bar */}
        {courseProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">التقدم</span>
              <span className="text-primary font-semibold">{courseProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleClick}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
            isCompleted
              ? "bg-success text-success-foreground hover:bg-success/90 shadow-soft"
              : "bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-glow-sm"
          )}
        >
          {getButtonIcon()}
          <span>{getButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
