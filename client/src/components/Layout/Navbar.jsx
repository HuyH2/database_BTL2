import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//  1. Import Context để biết ai đang đăng nhập
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  //  2. Lấy thông tin user và hàm logout từ kho dữ liệu
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Đăng xuất xong thì chuyển về trang login
  };

  return (
    <nav style={styles.navContainer}>
      {/* 1. LOGO (Ai cũng thấy) */}
      <div style={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          💮 E-Learning
        </Link>
      </div>

      {/* 2. MENU (Thay đổi nội dung theo Role) */}
      <ul style={styles.menuList}>
        
        {/* --- LUÔN HIỆN: Trang chủ --- */}
        <li><Link to="/" style={styles.link}>Trang chủ</Link></li>

        {/* --- TRƯỜNG HỢP: KHÁCH (Chưa đăng nhập) --- */}
        {!user && (
          <li><Link to="/courses" style={styles.link}>Khám phá khóa học</Link></li>
        )}

        {/* --- TRƯỜNG HỢP: HỌC VIÊN (Student) --- */}
        {user?.role === 'student' && (
          <>
            <li><Link to="/student/dashboard" style={styles.link}>Bảng điều khiển</Link></li>
            <li><Link to="/my-learning" style={styles.link}>Khóa học của tôi</Link></li>
            <li><Link to="/courses" style={styles.highlightLink}>Tìm khóa học mới ✨</Link></li>
          </>
        )}

        {/* --- TRƯỜNG HỢP: GIÁO VIÊN (Teacher) --- */}
        {user?.role === 'teacher' && (
          <>
            <li><Link to="/teacher/dashboard" style={styles.link}>Bảng điều khiển</Link></li>
            {/* Menu riêng cho giáo viên */}
            <li><Link to="/teacher/courses" style={styles.link}>Quản lý dạy học 👨‍🏫</Link></li>
            <li><Link to="/my-learning" style={styles.link}>Khóa học tham gia 📚</Link></li>
            <li><Link to="/courses" style={styles.highlightLink}>Tìm khóa học mới ✨</Link></li>
          </>
        )}

        {/* --- TRƯỜNG HỢP: ADMIN --- */}
        {user?.role === 'admin' && (
          <>
            <li><Link to="/admin/dashboard" style={styles.link}>Bảng điều khiển</Link></li>
            <li><Link to="/admin/users" style={styles.link}>Quản lý người dùng ⚙️</Link></li>
          </>
        )}
      </ul>

      {/* 3. KHU VỰC TÀI KHOẢN (Bên phải) */}
      <div style={styles.authBlock}>
        {!user ? (
          // NẾU CHƯA ĐĂNG NHẬP: Hiện nút Login/Register cũ
          <>
            <Link to="/login" style={styles.authBtn}>Đăng nhập</Link>
            <Link to="/register" style={styles.authBtn}>Đăng ký</Link>
          </>
        ) : (
          // NẾU ĐÃ ĐĂNG NHẬP: Hiện Avatar + Tên + Nút Đăng xuất
          <div style={styles.userSection}>
            {/* Ảnh đại diện tròn */}
            <img src={user.avatar} alt="Avatar" style={styles.avatar} />
            
            {/* Tên và Vai trò */}
            <div style={styles.userInfo}>
               <span style={styles.userName}>{user.name}</span>
               <span style={styles.userRole}>{user.role.toUpperCase()}</span>
            </div>

            {/* Nút đăng xuất */}
            <button onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
          </div>
        )}
      </div>
    </nav>
  );
};

// --- CSS STYLES  ---
const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px', 
    background: 'linear-gradient(to right, #c471f5, #fa71cd)', 
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
    fontFamily: "'Nunito', sans-serif",
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)', 
  },
  menuList: {
    display: 'flex',
    listStyle: 'none',
    gap: '25px',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'white', 
    fontSize: '15px',
    fontWeight: '700',
    transition: 'opacity 0.3s',
  },
  highlightLink: {
    textDecoration: 'none',
    color: '#fff', 
    fontWeight: '800',
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    padding: '6px 15px',
    borderRadius: '20px', 
    border: '1px solid rgba(255,255,255,0.4)',
    fontSize: '14px',
  },
  authBlock: {
    display: 'flex',
    gap: '10px', 
    alignItems: 'center',
  },
  authBtn: {
    textDecoration: 'none',
    backgroundColor: 'white', 
    color: '#6a1b9a', 
    padding: '8px 20px',
    borderRadius: '20px', 
    fontWeight: '800',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s', 
    fontFamily: "'Nunito', sans-serif",
  },
  
 //User đã login style
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: '5px 15px 5px 5px', 
    borderRadius: '30px',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%', 
    objectFit: 'cover',
    border: '2px solid white',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.2',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '800',
  },
  userRole: {
    fontSize: '10px',
    opacity: 0.9,
    fontWeight: '600',
  },
  logoutBtn: {
    background: 'white',
    border: 'none',
    color: '#a21dacff', 
    cursor: 'pointer',
    fontWeight: '800',
    marginLeft: '10px',
    fontSize: '11px',
    padding: '5px 10px',
    borderRadius: '10px',
    fontFamily: "'Nunito', sans-serif",
  }
};

export default Navbar;