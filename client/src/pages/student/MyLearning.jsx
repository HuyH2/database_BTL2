import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyLearning = () => {
  // --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
  const myCourses = [
    {
      id: 1,
      code: '79748_CO2013_002883',
      name: 'Hệ cơ sở Dữ liệu_Trương Tuấn Anh',
      bgPattern: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // Cam phấn
      progress: 75,
    },
    {
      id: 2,
      code: '79748_CO3001_004206',
      name: 'Công nghệ Phần mềm_Phan Trung Hiếu',
      bgPattern: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // Tím nhạt
      progress: 10,
    },
    {
      id: 3,
      code: '79748_CO3093_003446',
      name: 'Mạng máy tính_NGUYỄN PHƯƠNG DUY',
      bgPattern: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', // Hồng phấn
      progress: 90,
    }
  ];

  // --- 2. STATE CHO BỘ LỌC ---
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách khóa học
  const filteredCourses = myCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      
      {/* Header tiêu đề */}
      <h2 style={styles.pageTitle}>Các khoá học của tôi</h2>

      <div style={styles.contentBox}>
        
        {/* 1. THANH CÔNG CỤ (Filter & Search) */}
        <div style={styles.toolbar}>
          <h3 style={styles.subTitle}>Tổng quan về khóa học</h3>
          
          <div style={styles.filterRow}>
            <select 
              style={styles.select} 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">Tất cả (All)</option>
              <option value="InProgess">Đang học</option>
              <option value="Finished">Đã xong</option>
            </select>

            <input 
              type="text" 
              placeholder="🔍 Tìm kiếm khóa học..." 
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div style={styles.sortGroup}>
              <select style={styles.select}>
                <option>Sắp xếp theo tên</option>
                <option>Truy cập gần nhất</option>
              </select>
              <button style={styles.viewBtn}>Card ⊞</button>
            </div>
          </div>
        </div>

        {/* 2. DANH SÁCH KHÓA HỌC (Grid View) */}
        <div style={styles.grid}>
          
          {/* Thẻ Năm*/}
          <div style={{...styles.card, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '5px solid #c471f5'}}>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <h3 style={{color: '#c471f5', fontSize: '20px', marginBottom: '10px'}}>2025 - 2026</h3>
              <span style={{fontSize: '24px', color: '#c471f5'}}>▶</span>
            </div>
          </div>

          {/* Các thẻ khóa học */}
          {filteredCourses.map(course => (
            <div key={course.id} style={styles.card}>
              {/* Ảnh bìa (Pattern màu) */}
              <div style={{...styles.cardImage, background: course.bgPattern}}></div>
              
              {/* Nội dung */}
              <div style={styles.cardBody}>
                <p style={styles.courseCode}>{course.code}</p>
                
                {/* Tên khóa học (Link bấm vào học) */}
                <Link to={`/learn/${course.id}`} style={styles.courseName}>
                  {course.name}
                </Link>

                {/* Thanh tiến độ (Giống Bách Khoa có cái % học) */}
                <div style={styles.progressContainer}>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: `${course.progress}%`}}></div>
                  </div>
                  <span style={styles.progressText}>{course.progress}% hoàn thành</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 50px',
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#c471f5', 
    marginBottom: '30px',
  },
  contentBox: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    padding: '30px',
  },
  subTitle: {
    fontSize: '20px',
    color: '#333',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  
  toolbar: {
    marginBottom: '30px',
  },
  filterRow: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  select: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#555',
    outline: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  searchInput: {
    flex: 1, 
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    minWidth: '200px',
  },
  sortGroup: {
    display: 'flex',
    gap: '10px',
  },
  viewBtn: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },

  // Grid Khóa học
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive tự động
    gap: '25px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #eee',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(196, 113, 245, 0.2)',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '320px', // Chiều cao cố định để đều nhau
  },
  cardImage: {
    height: '140px',
    width: '100%',
    // Background pattern sẽ được set inline
  },
  cardBody: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  courseCode: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px',
  },
  courseName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#c471f5', // Tên khóa học màu tím
    textDecoration: 'none',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Giới hạn 3 dòng tên
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  
  // Thanh tiến độ
  progressContainer: {
    marginTop: '15px',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#eee',
    borderRadius: '3px',
    marginBottom: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fa71cd', // Màu hồng cho thanh tiến độ
    borderRadius: '3px',
  },
  progressText: {
    fontSize: '11px',
    color: '#666',
  }
};

export default MyLearning;