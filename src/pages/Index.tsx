import { AcademyProvider, useAcademy } from "@/context/AcademyContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import HeroSection from "@/components/sections/HeroSection";
import CoursesSection from "@/components/courses/CoursesSection";
import CoursesPage from "@/components/pages/CoursesPage";
import DashboardPage from "@/components/pages/DashboardPage";
import PathsPage from "@/components/pages/PathsPage";
import AboutPage from "@/components/pages/AboutPage";
import ContactPage from "@/components/pages/ContactPage";
import QuizPage from '@/components/pages/QuizPage';

const AppContent = () => {
  const { currentPage } = useAcademy();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection />
            <CoursesSection />
          </>
        );
      case 'courses':
        return <CoursesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'paths':
        return <PathsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'quiz':
        return <QuizPage />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Loader />
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

const Index = () => (
  <AcademyProvider>
    <AppContent />
  </AcademyProvider>
);

export default Index;
