import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navContainer}>
      {/* 1. LOGO */}
      <div style={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          🎓 E-Learning
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
          <Link to="/my-learning" style={styles.link}>Các khóa học của tôi</Link>
        </li>
        {/* Nút danh sách khóa học (để mua) */}
        <li>
          <Link to="/courses" style={styles.highlightLink}>Tìm khóa học mới</Link>
        </li>
      </ul>

      {/* 3. NÚT ĐĂNG NHẬP (Optional) */}
      <div>
        <Link to="/login" style={styles.loginBtn}>Đăng nhập</Link>
      </div>
    </nav>
  );
};

// CSS nằm ngay trong file cho gọn
const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#2c3e50', // Màu xanh đậm
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  menuList: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px', // Khoảng cách giữa các chữ
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#ecf0f1',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  highlightLink: {
    textDecoration: 'none',
    color: '#f1c40f', // Màu vàng nổi bật
    fontWeight: 'bold',
  },
  loginBtn: {
    textDecoration: 'none',
    backgroundColor: '#3498db',
    padding: '8px 16px',
    borderRadius: '4px',
    color: 'white',
  }
};

export default Navbar;