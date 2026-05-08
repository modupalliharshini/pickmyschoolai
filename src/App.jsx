import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthModals } from './components/AuthModals';
import HomePage from './pages/HomePage';
import FindSchoolsPage from './pages/FindSchoolsPage';
import AiMatchPage from './pages/AiMatchPage';
import ComparePage from './pages/ComparePage';
import ForSchoolsPage from './pages/ForSchoolsPage';
import FindTeacherPage from './pages/FindTeacherPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import BranchesPage from './pages/BranchesPage';
import SchoolOnboardingPage from './pages/SchoolOnboardingPage';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <ModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-schools" element={<FindSchoolsPage />} />
              <Route path="/ai-match" element={<AiMatchPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/for-schools" element={<ForSchoolsPage />} />
              <Route path="/list-school" element={<SchoolOnboardingPage />} />
              <Route path="/find-teacher" element={<FindTeacherPage />} />
              <Route path="/teacher/:id" element={<TeacherProfilePage />} />
              <Route path="/school/:id" element={<SchoolDetailPage />} />
              <Route path="/school/:id/branches" element={<BranchesPage />} />
            </Routes>
          </main>
          <Footer />
          <AuthModals />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;
