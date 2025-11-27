import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyCreatedCourses = () => {
  // --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'ReactJS Căn bản cho người mới', 
      image: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
      price: 1200000,
      students: 450, 
      rating: 4.8, 
      status: 'Published',
      lastUpdate: '20/11/2025'
    },
    { 
      id: 2, 
      title: 'NodeJS & Express Backend', 
      image: 'https://files.fullstack.edu.vn/f8-prod/courses/2.png',
      price: 1500000,
      students: 320, 
      rating: 4.9, 
      status: 'Published',
      lastUpdate: '15/11/2025'
    },
    { 
      id: 3, 
      title: 'Làm chủ SQL Server 2022', 
      image: 'https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png',
      price: 800000,
      students: 0, 
      rating: 0, 
      status: 'Draft',
      lastUpdate: 'Hôm qua'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // --- 2. XỬ LÝ XOÁ KHÓA HỌC ---
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này không?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // --- 3. LỌC DỮ LIỆU ---
  const filteredCourses = courses.filter(course => {
    const matchName = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || course.status === filterStatus;
    return matchName && matchStatus;
  });

  return (
    <div style={styles.container}>
      
      {/* Header: Tiêu đề & Nút Tạo mới */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Khóa học tôi tạo</h2>
          <p style={{color: '#666'}}>Quản lý tất cả nội dung giảng dạy của bạn.</p>
        </div>
        <Link to="/teacher/create-course">
          <button style={styles.createBtn}>➕ Tạo khóa học mới</button>
        </Link>
      </div>

      {/* Thanh công cụ (Filter & Search) */}
      <div style={styles.toolbar}>
        <div style={styles.filterGroup}>
          <input 
            type="text" 
            placeholder="🔍 Tìm kiếm khóa học..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            style={styles.select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Published">Đang hoạt động (Published)</option>
            <option value="Draft">Bản nháp (Draft)</option>
          </select>
        </div>
      </div>

      {/* DANH SÁCH KHÓA HỌC (GRID) */}
      <div style={styles.grid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} style={styles.card}>
              {/* Ảnh bìa */}
              <div style={styles.imageContainer}>
                <img src={course.image} alt={course.title} style={styles.image} />
                <span style={course.status === 'Published' ? styles.badgeSuccess : styles.badgeDraft}>
                  {course.status === 'Published' ? 'Đang hoạt động' : 'Bản nháp'}
                </span>
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{course.title}</h3>
                
                {/* Thông số */}
                <div style={styles.statsRow}>
                  <div style={styles.statItem}>
                    <span>👥</span> {course.students} học viên
                  </div>
                  <div style={styles.statItem}>
                    <span>⭐</span> {course.rating}
                  </div>
                  <div style={styles.statItem}>
                    <span>💰</span> {course.price.toLocaleString()} đ
                  </div>
                </div>
                
                <p style={{fontSize: '12px', color: '#999', margin: '10px 0'}}>
                  Cập nhật: {course.lastUpdate}
                </p>

                <div style={styles.divider}></div>

                {/* Nút hành động */}
                <div style={styles.actionGroup}>
                  <Link to={`/courses/${course.id}`} style={styles.viewLink}>
                    👁️ Xem
                  </Link>
                  <button style={styles.editBtn}>✏️ Sửa</button>
                  <button 
                    style={styles.deleteBtn} 
                    onClick={() => handleDelete(course.id)}
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <p>Không tìm thấy khóa học nào.</p>
          </div>
        )}
      </div>

    </div>
  );
};

// --- STYLES (Giữ nguyên style Tím Hồng & Nunito) ---
const styles = {
  container: {
    padding: '30px 50px',
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '28px', fontWeight: '800', color: '#333', margin: '0 0 5px 0',
  },
  createBtn: {
    padding: '12px 25px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold',
    cursor: 'pointer', boxShadow: '0 4px 15px rgba(196, 113, 245, 0.4)',
    transition: 'transform 0.2s',
  },
  
  // Toolbar
  toolbar: { marginBottom: '30px' },
  filterGroup: { display: 'flex', gap: '15px' },
  searchInput: {
    padding: '10px 20px', borderRadius: '25px', border: '1px solid #ddd',
    width: '300px', outline: 'none', fontSize: '14px', fontFamily: 'inherit',
  },
  select: {
    padding: '10px 20px', borderRadius: '25px', border: '1px solid #ddd',
    outline: 'none', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer',
  },

  // Grid & Card
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive tự động
    gap: '30px',
  },
  card: {
    backgroundColor: 'white', borderRadius: '15px', border: '1px solid #eee',
    overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    display: 'flex', flexDirection: 'column',
  },
  imageContainer: { position: 'relative', height: '160px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  
  // Badges (Nhãn trạng thái)
  badgeSuccess: {
    position: 'absolute', top: '10px', right: '10px',
    backgroundColor: '#27ae60', color: 'white', fontSize: '11px', fontWeight: 'bold',
    padding: '4px 10px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  badgeDraft: {
    position: 'absolute', top: '10px', right: '10px',
    backgroundColor: '#7f8c8d', color: 'white', fontSize: '11px', fontWeight: 'bold',
    padding: '4px 10px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },

  cardBody: { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' },
  cardTitle: { fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '15px', lineHeight: '1.4' },
  
  statsRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '10px' },
  statItem: { display: 'flex', alignItems: 'center', gap: '5px' },
  
  divider: { height: '1px', backgroundColor: '#f0f0f0', margin: '10px 0 15px 0' },
  
  // Nút hành động
  actionGroup: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  viewLink: {
    padding: '6px 12px', borderRadius: '8px', textDecoration: 'none',
    color: '#3498db', backgroundColor: '#ebf5fb', fontSize: '13px', fontWeight: '600',
  },
  editBtn: {
    padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    color: '#f39c12', backgroundColor: '#fef5e7', fontSize: '13px', fontWeight: '600',
  },
  deleteBtn: {
    padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    color: '#e74c3c', backgroundColor: '#fdedec', fontSize: '13px', fontWeight: '600',
  },

  emptyState: {
    gridColumn: '1 / -1', // Chiếm hết chiều ngang
    textAlign: 'center', color: '#888', padding: '50px',
    backgroundColor: 'white', borderRadius: '15px', border: '1px dashed #ddd',
  }
};

export default MyCreatedCourses;