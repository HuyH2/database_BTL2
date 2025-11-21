import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navContainer}>
      {/* 1. LOGO */}
      <div style={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          🌸 E-Learning
        </Link>
      </div>

      {/* 2. CÁC MENU (Board) */}
      <ul style={styles.menuList}>
        <li>
          <Link to="/" style={styles.link}>Trang chủ</Link>
        </li>
        <li>
          <Link to="/student/dashboard" style={styles.link}>Bảng điều khiển</Link>
        </li>
        <li>
          <Link to="/my-learning" style={styles.link}>Khóa học của tôi</Link>
        </li>
        {/* Nút danh sách khóa học */}
        <li>
          <Link to="/courses" style={styles.highlightLink}>Tìm khóa học mới ✨</Link>
        </li>
      </ul>

      {/* 3. KHU VỰC TÀI KHOẢN (Đăng nhập & Đăng ký) */}
      <div style={styles.authBlock}>
        <Link to="/login" style={styles.authBtn}>Đăng nhập</Link>
        <Link to="/register" style={styles.authBtn}>Đăng ký</Link>
      </div>
    </nav>
  );
};

const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)', 
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)', 
  },
  menuList: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: 'white', 
    fontSize: '16px',
    fontWeight: '500',
    transition: 'opacity 0.3s',
  },
  highlightLink: {
    textDecoration: 'none',
    color: '#fff', 
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: '5px 10px',
    borderRadius: '20px', 
  },
  authBlock: {
    display: 'flex',
    gap: '10px', 
  },
  authBtn: {
    textDecoration: 'none',
    backgroundColor: 'white', 
    color: '#6a1b9a', 
    padding: '8px 20px',
    borderRadius: '20px', 
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s', 
  }
};

export default Navbar;