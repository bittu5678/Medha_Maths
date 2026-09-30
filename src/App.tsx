import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { RazorpayCheckoutModal } from './components/common/RazorpayCheckoutModal';
import { VideoLessonPlayerModal } from './components/common/VideoLessonPlayerModal';
import { StudyMaterialViewerModal } from './components/common/StudyMaterialViewerModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { HomePage } from './components/home/HomePage';
import { CourseCatalogPage } from './components/courses/CourseCatalogPage';
import { CourseDetailsPage } from './components/courses/CourseDetailsPage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StudyMaterialsPage } from './components/materials/StudyMaterialsPage';
import { QuizPlayerPage } from './components/quiz/QuizPlayerPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ClassDetailsPage } from './components/pages/ClassDetailsPage';
import {
  AboutUsPage,
  ContactUsPage,
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage
} from './components/pages/StaticPages';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'courses':
      case 'subjects':
        return <CourseCatalogPage />;
      case 'course-details':
        return <CourseDetailsPage />;
      case 'classes':
        return <ClassDetailsPage />;
      case 'dashboard':
      case 'dashboard-profile':
        return <StudentDashboard />;
      case 'materials':
      case 'study-material':
        return <StudyMaterialsPage />;
      case 'quizzes':
      case 'quiz-runner':
        return <QuizPlayerPage />;
      case 'admin':
      case 'admin-courses':
      case 'admin-classes':
      case 'admin-subjects':
      case 'admin-curriculum':
      case 'admin-students':
      case 'admin-orders':
        return <AdminDashboard />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
      case 'faq':
        return <ContactUsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'refund':
        return <RefundPolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-grow">{renderView()}</main>
      <Footer />
      <WhatsAppButton />
      <RazorpayCheckoutModal />
      <VideoLessonPlayerModal />
      <StudyMaterialViewerModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
