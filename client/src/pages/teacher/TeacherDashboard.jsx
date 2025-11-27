import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  // --- 1. DỮ LIỆU GIẢ (STATS) ---
  const stats = [
    { title: 'Tổng số học viên', value: '1,250', icon: '👥', color: '#6a1b9a' },
    { title: 'Khóa học đang dạy', value: '8', icon: '📚', color: '#c471f5' },
    { title: 'Bài tập cần chấm', value: '12', icon: '📝', color: '#e74c3c' },
    { title: 'Doanh thu tháng', value: '15.2M', icon: '💰', color: '#27ae60' },
  ];

  // --- 2. DANH SÁCH KHÓA HỌC ---
  const myCourses = [
    { id: 1, title: 'ReactJS Căn bản cho người mới', students: 450, rating: 4.8, status: 'Published' },
    { id: 2, title: 'NodeJS & Express Backend', students: 320, rating: 4.9, status: 'Published' },
    { id: 3, title: 'Làm chủ SQL Server 2022', students: 105, rating: 4.5, status: 'Draft' },
  ];

  // --- 3. HOẠT ĐỘNG GẦN ĐÂY ---
  const activities = [
    { id: 1, user: 'Nguyễn Văn A', action: 'đã nộp bài tập', course: 'ReactJS Căn bản', time: '5 phút trước' },
    { id: 2, user: 'Trần Thị B', action: 'đã mua khóa học', course: 'NodeJS Backend', time: '2 giờ trước' },
    { id: 3, user: 'Lê Văn C', action: 'bình luận', course: 'SQL Server', time: '1 ngày trước' },
  ];

  return (
    <div style={styles.container}>
      
      {/* Header & Nút tạo mới */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Bảng Điều Khiển Giáo Viên</h2>
        </div>
        <Link to="/teacher/create-course">
          <button style={styles.createBtn}>➕ Tạo khóa học mới</button>
        </Link>
      </div>

      {/* 1. THỐNG KÊ NHANH (STATS) */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{fontSize: '30px'}}>{stat.icon}</div>
            <div>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={{color: '#888', fontSize: '14px', margin: 0}}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainGrid}>
        
        {/* 2. QUẢN LÝ KHÓA HỌC (Bên trái) */}
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.sectionTitle}>Khóa học của tôi</h3>
              <Link to="/teacher/courses" style={styles.viewAll}>Xem tất cả</Link>
            </div>
            
            <table style={styles.table}>
              <thead>
                <tr style={{borderBottom: '2px solid #f0f0f0', textAlign: 'left'}}>
                  <th style={styles.th}>Tên khóa học</th>
                  <th style={styles.th}>Học viên</th>
                  <th style={styles.th}>Trạng thái</th>
                  <th style={styles.th}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map(course => (
                  <tr key={course.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={{fontWeight: 'bold', color: '#333'}}>{course.title}</span>
                    </td>
                    <td style={styles.td}>{course.students}</td>
                    <td style={styles.td}>
                      <span style={course.status === 'Published' ? styles.statusActive : styles.statusDraft}>
                        {course.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.iconBtn}>✏️</button>
                      <button style={styles.iconBtn}>📊</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. THEO DÕI HỌC VIÊN (Bên phải) */}
        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Hoạt động gần đây</h3>
            <div style={styles.activityList}>
              {activities.map(act => (
                <div key={act.id} style={styles.activityItem}>
                  <div style={styles.actAvatar}>{act.user.charAt(0)}</div>
                  <div>
                    <p style={{margin: 0, fontSize: '14px'}}>
                      <strong>{act.user}</strong> {act.action}
                    </p>
                    <p style={{margin: '2px 0', fontSize: '12px', color: '#c471f5'}}>{act.course}</p>
                    <p style={{margin: 0, fontSize: '11px', color: '#999'}}>{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.viewMoreBtn}>Xem chi tiết theo dõi</button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLES (Gradient Tím Hồng & Nunito) ---
const styles = {
  container: {
    padding: '30px 50px',
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#333',
    margin: '0 0 5px 0',
  },
  createBtn: {
    padding: '12px 25px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(196, 113, 245, 0.4)',
    transition: 'transform 0.2s',
  },
  
  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
    border: '1px solid #eee',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '800',
    margin: 0,
    color: '#333',
  },

  // Main Layout
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr', // Trái rộng, phải hẹp
    gap: '30px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  },
  viewAll: {
    textDecoration: 'none',
    color: '#c471f5',
    fontWeight: '600',
    fontSize: '14px',
  },

  // Table Styles
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '10px', fontSize: '13px', color: '#888' },
  td: { padding: '15px 10px', borderBottom: '1px solid #f9f9f9', fontSize: '14px' },
  tr: { transition: 'background 0.2s' },
  
  // Status Badges
  statusActive: {
    backgroundColor: '#e8f5e9', color: '#27ae60',
    padding: '5px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold'
  },
  statusDraft: {
    backgroundColor: '#fff3e0', color: '#e67e22',
    padding: '5px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold'
  },
  iconBtn: {
    border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px'
  },

  // Activity List
  activityList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  activityItem: { display: 'flex', gap: '15px', alignItems: 'start' },
  actAvatar: {
    width: '35px', height: '35px', borderRadius: '50%',
    backgroundColor: '#f3e5f5', color: '#c471f5',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontWeight: 'bold', fontSize: '14px'
  },
  viewMoreBtn: {
    width: '100%', marginTop: '20px', padding: '10px',
    backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '10px',
    color: '#666', cursor: 'pointer', fontWeight: '600'
  }
};

export default TeacherDashboard;