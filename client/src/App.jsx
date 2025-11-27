import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// 1. Layout & Components dùng chung
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// 2. Pages
import Profile from './pages/auth/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';

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
import ForumPage from './pages/community/ForumPage';
import QuizPlayer from "./components/QuizPlayer";

function App() {
  const location = useLocation();
  
  // Danh sách các trang KHÔNG muốn hiện Navbar/Footer
  const hideLayoutRoutes = ['/login', '/register'];
  
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      
      {shouldShowLayout && <Navbar />}

      <div className="main-content" style={{ minHeight: '80vh', padding: shouldShowLayout ? '20px' : '0' }}>
        <Routes>
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/quiz/:quizId" element={<QuizPlayer />} />
          <Route path="/profile" element={<Profile />} />
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* --- STUDENT ROUTES --- */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/learn/:courseId" element={<LessonPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/my-certificates" element={<MyCertificates />} />

          {/* --- TEACHER ROUTES --- */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<MyCreatedCourses />} />
          <Route path="/teacher/student-tracking" element={<StudentTracking />} />
          <Route path="/teacher/create-course" element={<CreateCourse />} />
          <Route path="/teacher/create-quiz" element={<CreateQuiz />} />
          <Route path="/teacher/upload-video" element={<UploadVideo />} />
          <Route path="/teacher/upload-doc" element={<UploadDocument />} />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/approvals" element={<CourseApproval />} />
          <Route path="/admin/organizations" element={<OrganizationManager />} />
          <Route path="/admin/forums" element={<ForumManager />} />

          {/* --- GUARDIAN ROUTES --- */}
          <Route path="/guardian/dashboard" element={<GuardianDashboard />} />
          <Route path="/guardian/child-progress" element={<ChildProgress />} />
        </Routes>
      </div>

      {shouldShowLayout && <Footer />}
    </div>
  );
}

export default App;