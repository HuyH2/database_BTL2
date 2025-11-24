import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// 1. Layout & Components for shared use
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './AppRouter';

// 2. Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentLoginPage from './pages/auth/StudentLoginPage';
import InstructorLoginPage from './pages/auth/InstructorLoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';

// 👇 FIX ERROR 1: Import TestAuth page (UI interface) NOT AuthContext (Data store)
// If you don't have this file yet, please remove this import line and remove the Route below
//import TestAuth from './pages/TestAuth'; 

import HomePage from './pages/public/HomePage';
import CourseList from './pages/public/CourseList';
import CourseDetail from './pages/public/CourseDetail';
import StudentDashboard from './pages/student/StudentDashboard';
import MyLearning from './pages/student/MyLearning';
import LessonPage from './pages/student/LessonPage';
import Cart from './pages/student/Cart';
import Checkout from './pages/student/Checkout';
import OrderHistory from './pages/student/OrderHistory';
import MyCertificates from './pages/student/MyCertificates';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyCreatedCourses from './pages/teacher/MyCreatedCourses';
import StudentTracking from './pages/teacher/StudentTracking';
import CreateCourse from './pages/teacher/CourseEditor/CreateCourse';
import CreateQuiz from './pages/teacher/CourseEditor/CreateQuiz';
import UploadVideo from './pages/teacher/CourseEditor/UploadVideo';
import UploadDocument from './pages/teacher/CourseEditor/UploadDocument';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseApproval from './pages/admin/CourseApproval';
import OrganizationManager from './pages/admin/OrganizationManager';
import ForumManager from './pages/admin/ForumManager';
import GuardianDashboard from './pages/guardian/GuardianDashboard';
import ChildProgress from './pages/guardian/ChildProgress';

function App() {
  const location = useLocation();
  
  // List of pages that DON'T want to show Navbar/Footer
  const hideLayoutRoutes = ['/login', '/login/student', '/login/instructor', '/login/admin', '/register', '/'];
  
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      
      {shouldShowLayout && <Navbar />}

      <div className="main-content" style={{ minHeight: '80vh', paddingTop: shouldShowLayout && location.pathname !== '/' ? '64px' : '0' }}>
        <Routes>
          {/* --- TEST TOOLS --- */}
          {/*<Route path="/test-auth" element={<TestAuth />} /> */}


          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/student" element={<StudentLoginPage />} />
          <Route path="/login/instructor" element={<InstructorLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* --- STUDENT ROUTES --- */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-learning" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyLearning />
            </ProtectedRoute>
          } />
          <Route path="/learn/:courseId" element={
            <ProtectedRoute allowedRoles={['student']}>
              <LessonPage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-history" element={
            <ProtectedRoute allowedRoles={['student']}>
              <OrderHistory />
            </ProtectedRoute>
          } />
          <Route path="/my-certificates" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyCertificates />
            </ProtectedRoute>
          } />

          {/* --- INSTRUCTOR ROUTES --- */}
          <Route path="/teacher/dashboard" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher/courses" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <MyCreatedCourses />
            </ProtectedRoute>
          } />
          <Route path="/teacher/student-tracking" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <StudentTracking />
            </ProtectedRoute>
          } />
          <Route path="/teacher/create-course" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <CreateCourse />
            </ProtectedRoute>
          } />
          <Route path="/teacher/create-quiz" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <CreateQuiz />
            </ProtectedRoute>
          } />
          <Route path="/teacher/upload-video" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <UploadVideo />
            </ProtectedRoute>
          } />
          <Route path="/teacher/upload-doc" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <UploadDocument />
            </ProtectedRoute>
          } />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/approvals" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CourseApproval />
            </ProtectedRoute>
          } />
          <Route path="/admin/organizations" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <OrganizationManager />
            </ProtectedRoute>
          } />
          <Route path="/admin/forums" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ForumManager />
            </ProtectedRoute>
          } />

          {/* --- GUARDIAN ROUTES --- */}
          <Route path="/guardian/dashboard" element={
            <ProtectedRoute allowedRoles={['guardian']}>
              <GuardianDashboard />
            </ProtectedRoute>
          } />
          <Route path="/guardian/child-progress" element={
            <ProtectedRoute allowedRoles={['guardian']}>
              <ChildProgress />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      {shouldShowLayout && <Footer />}
    </div>
  );
}

export default App;