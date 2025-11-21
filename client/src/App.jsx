import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Layout & Components dùng chung
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// 2. Auth (Xác thực)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// 3. Public (Trang công khai)
import HomePage from './pages/public/HomePage';
import CourseList from './pages/public/CourseList';
import CourseDetail from './pages/public/CourseDetail';

// 4. Student (Học viên)
import StudentDashboard from './pages/student/StudentDashboard';
import MyLearning from './pages/student/MyLearning';
import LessonPage from './pages/student/LessonPage';
import Cart from './pages/student/Cart';
import Checkout from './pages/student/Checkout';
import OrderHistory from './pages/student/OrderHistory';
import MyCertificates from './pages/student/MyCertificates';

// 5. Teacher (Giáo viên)
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyCreatedCourses from './pages/teacher/MyCreatedCourses';
import StudentTracking from './pages/teacher/StudentTracking';
// --- Teacher: Course Editor
import CreateCourse from './pages/teacher/CourseEditor/CreateCourse';
import CreateQuiz from './pages/teacher/CourseEditor/CreateQuiz';
import UploadVideo from './pages/teacher/CourseEditor/UploadVideo';
import UploadDocument from './pages/teacher/CourseEditor/UploadDocument';

// 6. Admin (Quản trị viên)
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseApproval from './pages/admin/CourseApproval';
import OrganizationManager from './pages/admin/OrganizationManager';
import ForumManager from './pages/admin/ForumManager';

// 7. Guardian (Phụ huynh)
import GuardianDashboard from './pages/guardian/GuardianDashboard';
import ChildProgress from './pages/guardian/ChildProgress';

function App() {
  return (
    <div className="app-container">
      {/* Navbar luôn hiển thị ở trên cùng */}
      <Navbar />

      {/* Nội dung thay đổi theo đường dẫn */}
      <div className="main-content" style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          {/* --- PUBLIC ROUTES (Ai cũng xem được) --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} /> {/* :id là tham số động */}

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
          {/* Các chức năng soạn thảo khóa học */}
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

      {/* Footer luôn hiển thị ở dưới cùng */}
      <Footer />
    </div>
  );
}

export default App;