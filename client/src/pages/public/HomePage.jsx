import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* Banner Giới thiệu */}
      <div style={styles.heroSection}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>Học kỹ năng mới, mở lối thành công</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Hệ thống học trực tuyến hàng đầu với các khóa học thực tế.
        </p>
        
        <Link to="/courses">
          <button style={styles.ctaButton}>Khám phá khóa học ngay</button>
        </Link>
      </div>

      {/* Phần giới thiệu tính năng */}
      <div style={styles.features}>
        <div style={styles.featureItem}>
          <h3>📚 Học mọi lúc</h3>
          <p>Truy cập bài giảng 24/7 bất cứ đâu.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>📝 Trắc nghiệm</h3>
          <p>Kiểm tra kiến thức ngay sau bài học.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>🏆 Chứng chỉ</h3>
          <p>Nhận chứng nhận sau khi hoàn thành.</p>
        </div>
      </div>

    </div>
  );
};

const styles = {
  heroSection: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
  ctaButton: {
    padding: '12px 30px',
    fontSize: '18px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    padding: '50px 20px',
  },
  featureItem: {
    textAlign: 'center',
    maxWidth: '200px',
  }
};

export default HomePage;