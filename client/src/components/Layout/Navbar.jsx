import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  //LOGIC BẬT TẮT DROPDOWN
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={styles.navWrapper}>
      <nav style={styles.navContainer}>
        {/* 1. LOGO */}
        <div style={styles.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            💮 E-Learning
          </Link>
        </div>

        {/* 2. MENU GIỮA */}
        <ul style={styles.menuList}>
          <li><Link to="/" style={styles.link}>Trang chủ</Link></li>
          
          {!user && (
          <li><Link to="/courses" style={styles.link}>Khám phá khóa học</Link></li>
        )}

          {user?.role === 'student' && (
            <>
              <li><Link to="/student/dashboard" style={styles.link}>Bảng điều khiển</Link></li>
              <li><Link to="/my-learning" style={styles.link}>Khóa học của tôi</Link></li>
            </>
          )}

          {user?.role === 'teacher' && (
            <>
              <li><Link to="/teacher/dashboard" style={styles.link}>Bảng điều khiển</Link></li>
              <li><Link to="/teacher/courses" style={styles.link}>Quản lý</Link></li>
            </>
          )}

          {user?.role === 'admin' && (
            <li><Link to="/admin/dashboard" style={styles.link}>Quản trị</Link></li>
          )}
        </ul>

        {/* 3. AVATAR & DROPDOWN */}
        <div style={styles.authBlock}>
          {!user ? (
            <>
              <Link to="/login" style={styles.authBtn}>Đăng nhập</Link>
              <Link to="/register" style={styles.authBtn}>Đăng ký</Link>
            </>
          ) : (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              
              {/* Avatar Button */}
              <div onClick={() => setShowDropdown(!showDropdown)} style={styles.avatarWrapper}>
                <img src={user.avatar} alt="User" style={styles.avatarBtn} />
                <span style={{fontSize: '12px', marginLeft: '5px', color: 'white'}}>▼</span>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div style={styles.dropdownMenu}>
                  
                  <div style={styles.dropdownHeader}>
                    <div style={{fontWeight: '800', fontSize: '16px', color: '#333'}}>{user.name}</div>
                    <div style={{fontSize: '12px', color: '#888'}}>{user.email || user.role.toUpperCase()}</div>
                  </div>

                  <div style={styles.separator}></div>

                  <Link to="/profile" style={styles.dropdownItem}>👤 Hồ sơ cá nhân</Link>
                  <Link to="/settings" style={styles.dropdownItem}>⚙️ Cài đặt</Link>
                  
                  <div style={styles.separator}></div>
                  
                  <div onClick={handleLogout} style={{...styles.dropdownItem, color: '#e74c3c', fontWeight: '700'}}>
                    🚪 Đăng xuất
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const styles = {
  navWrapper: {
    position: 'sticky',
    top: '20px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '10px 30px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)', 
    borderRadius: '50px',
    boxShadow: '0 10px 25px rgba(196, 113, 245, 0.5)',
    color: 'white',
    fontFamily: "'Nunito', sans-serif",
  },
  logo: {
    fontSize: '24px', fontWeight: '800', textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    display: 'flex', alignItems: 'center',
  },
  menuList: {
    display: 'flex', listStyle: 'none', gap: '30px', margin: 0, padding: 0,
  },
  link: {
    textDecoration: 'none', color: 'white', fontSize: '16px', fontWeight: '700', transition: 'all 0.3s',
  },
  authBlock: { display: 'flex', gap: '10px' },
  authBtn: {
    textDecoration: 'none', backgroundColor: 'white', color: '#6a1b9a', padding: '10px 24px',
    borderRadius: '30px', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  avatarWrapper: {
    display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px',
    borderRadius: '30px', transition: 'background 0.2s',
  },
  avatarBtn: {
    width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white',
  },
  dropdownMenu: {
    position: 'absolute', top: '55px', right: '0', width: '240px',
    backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 5px 30px rgba(0,0,0,0.15)',
    padding: '10px 0', display: 'flex', flexDirection: 'column', zIndex: 9999, textAlign: 'left',
  },
  dropdownHeader: { padding: '10px 20px' },
  separator: { height: '1px', backgroundColor: '#eee', margin: '5px 0' },
  dropdownItem: {
    textDecoration: 'none', color: '#444', padding: '10px 20px', fontSize: '15px', fontWeight: '600',
    display: 'block', cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  }
};

export default Navbar;