import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { coursesData, quizzesData, Course, Quiz, QuizResult, Message, User } from '@/data/academyData';

interface AcademyContextType {
  user: User | null;
  login: (email: string, password: string, username?: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  courses: Course[];
  quizzes: Record<number, Quiz>;
  progress: Record<number, number>;
  enrolledCourses: number[];
  enrollCourse: (courseId: number) => void;
  quizResults: Record<number, QuizResult>;
  saveQuizResult: (courseId: number, result: QuizResult) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  currentPage: string;
  navigate: (page: string) => void;
  // Course page filter (e.g., 'web', 'backend', 'ai', 'app' or 'all')
  courseCategoryFilter: string;
  setCourseCategoryFilter: (cat: string) => void;
  // New helper to request auth & redirect after successful login
  requireAuthToNavigate: (page: string, courseId?: number | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isCourseModalOpen: boolean;
  setIsCourseModalOpen: (open: boolean) => void;
  selectedCourseId: number | null;
  setSelectedCourseId: (id: number | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within AcademyProvider');
  }
  return context;
};

interface AcademyProviderProps {
  children: ReactNode;
}

export const AcademyProvider: React.FC<AcademyProviderProps> = ({ children }) => {
  // Dummy demo user for portfolio showcase
  const demoUser: User = {
    username: 'Demo User',
    email: 'demo@aiacademy.com',
    joined: new Date().toISOString()
  };

  // Demo enrolled courses for immediate access
  const demoCourses = [1, 2, 3, 5];
  
  // Demo progress data
  const demoProgress: Record<number, number> = {
    1: 75,
    2: 60,
    3: 100,
    5: 45
  };

  const [user, setUser] = useState<User | null>(demoUser);
  const [progress, setProgress] = useState<Record<number, number>>(demoProgress);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>(demoCourses);
  const [quizResults, setQuizResults] = useState<Record<number, QuizResult>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Keeps a global filter for Courses page so other pages can open the courses list pre-filtered
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const savedProgress = localStorage.getItem('academyProgress');
    const savedQuizResults = localStorage.getItem('academyQuizResults');
    const savedMessages = localStorage.getItem('academyMessages');
    const savedEnrolled = localStorage.getItem('academyEnrolled');

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedQuizResults) setQuizResults(JSON.parse(savedQuizResults));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedEnrolled) setEnrolledCourses(JSON.parse(savedEnrolled));
  }, []);

  // Pending redirect after login (when user attempted an authenticated action)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [pendingCourseId, setPendingCourseId] = useState<number | null>(null);

  const login = (email: string, password: string, username?: string): boolean => {
    // Simplified: Always allow login for demo purposes
    return true;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Simplified: Always allow signup for demo purposes
    return true;
  };

  const logout = () => {
    // Reset to demo user on logout
    setUser(demoUser);
    setCurrentPage('home');
  };

  const enrollCourse = (courseId: number) => {
    if (!enrolledCourses.includes(courseId)) {
      const newEnrolled = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrolled);
      localStorage.setItem('academyEnrolled', JSON.stringify(newEnrolled));
    }

    const currentProgress = progress[courseId] || 0;
    const increment = Math.floor(Math.random() * 15) + 10;
    const newProgress = { ...progress, [courseId]: Math.min(currentProgress + increment, 100) };
    setProgress(newProgress);
    localStorage.setItem('academyProgress', JSON.stringify(newProgress));

    // If the course just reached 100%, select it so the Exams section can appear automatically
    if (newProgress[courseId] === 100) {
      setSelectedCourseId(courseId);
    }
  };

  const saveQuizResult = (courseId: number, result: QuizResult) => {
    const newResults = { ...quizResults, [courseId]: result };
    setQuizResults(newResults);
    localStorage.setItem('academyQuizResults', JSON.stringify(newResults));
  };

  const addMessage = (message: Message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    localStorage.setItem('academyMessages', JSON.stringify(newMessages));
  };

  const requireAuthToNavigate = (page: string, courseId?: number | null) => {
    // No longer required - always allow navigation
    setCurrentPage(page.replace('#', ''));
  };

  const navigate = (page: string) => {
    const cleanPage = page.replace('#', '');
    setCurrentPage(cleanPage);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AcademyContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        courses: coursesData,
        quizzes: quizzesData,
        progress,
        enrolledCourses,
        enrollCourse,
        quizResults,
        saveQuizResult,
        messages,
        addMessage,
        currentPage,
        navigate,
        // course filter
        courseCategoryFilter,
        setCourseCategoryFilter,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isCourseModalOpen,
        setIsCourseModalOpen,
        selectedCourseId,
        setSelectedCourseId,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        requireAuthToNavigate,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};
