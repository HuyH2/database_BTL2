import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuizPlayer from '../../components/QuizPlayer'; // Component làm bài thi (ở dưới)

const LessonPage = () => {
  const { courseId } = useParams();
  
  // --- DỮ LIỆU GIẢ (Mô phỏng cấu trúc SQL: Lesson -> ContentItem) ---
  const courseContent = [
    {
      LessonID: 1,
      Lesson_No: 1,
      Title: "Chương 1: Giới thiệu",
      items: [
        { ContentID: 1, Title: "Video giới thiệu", Type: 'VIDEO', Duration: 10, Url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { ContentID: 7, Title: "Tài liệu nhập môn (PDF)", Type: 'DOCUMENT', Format: 'pdf', Url: "/docs/intro.pdf" }
      ]
    },
    {
      LessonID: 2,
      Lesson_No: 2,
      Title: "Chương 2: Kiến thức nền tảng",
      items: [
        { ContentID: 2, Title: "Video bài giảng chính", Type: 'VIDEO', Duration: 15, Url: "https://www.youtube.com/embed/xyz" },
        { 
          ContentID: 13, Title: "Kiểm tra kiến thức", Type: 'QUIZ', 
          Description: "Bài kiểm tra 15 phút", PassingScore: 70, MaxAttempts: 3, Number_Questions: 10 
        }
      ]
    }
  ];

  const [activeItem, setActiveItem] = useState(courseContent[0].items[0]);

  // --- RENDER NỘI DUNG CHÍNH ---
  const renderContent = (item) => {
    switch (item.Type) {
      case 'VIDEO':
        return (
          <div style={styles.videoWrapper}>
            <iframe 
              width="100%" height="500px" src={item.Url} title={item.Title} 
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
            ></iframe>
            <h2 style={{marginTop: 20}}>{item.Title}</h2>
            <p>Thời lượng: {item.Duration} phút</p>
          </div>
        );
      case 'DOCUMENT':
        return (
          <div style={styles.docWrapper}>
            <h2>📄 {item.Title}</h2>
            <div style={styles.docPlaceholder}>
              <p>Đang hiển thị file: {item.Url} ({item.Format})</p>
              <button style={styles.downloadBtn}>⬇ Tải xuống</button>
            </div>
          </div>
        );
      case 'QUIZ':
        return <QuizPlayer quizData={item} />; // Gọi component Quiz
      default:
        return <div>Nội dung không hỗ trợ</div>;
    }
  };

  return (
    <div style={styles.container}>
      {/* CỘT TRÁI: DANH SÁCH BÀI HỌC (Sidebar) */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <Link to="/my-learning" style={{textDecoration:'none', color:'#333'}}>⬅ Quay lại</Link>
          <h3 style={{margin: '10px 0'}}>Nội dung khóa học</h3>
        </div>
        
        <div style={styles.lessonList}>
          {courseContent.map(lesson => (
            <div key={lesson.LessonID} style={styles.lessonGroup}>
              <div style={styles.lessonTitle}><strong>{lesson.Title}</strong></div>
              {lesson.items.map(item => (
                <div 
                  key={item.ContentID} 
                  style={{
                    ...styles.lessonItem, 
                    backgroundColor: activeItem.ContentID === item.ContentID ? '#f3e5f5' : 'transparent',
                    color: activeItem.ContentID === item.ContentID ? '#8e44ad' : '#333'
                  }}
                  onClick={() => setActiveItem(item)}
                >
                  <span style={{marginRight: 8}}>
                    {item.Type === 'VIDEO' ? '🎥' : item.Type === 'QUIZ' ? '📝' : '📄'}
                  </span>
                  {item.Title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CỘT PHẢI: MÀN HÌNH HỌC (Main Content) */}
      <div style={styles.mainContent}>
        {renderContent(activeItem)}
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', height: '100vh', fontFamily: "'Nunito', sans-serif" },
  sidebar: { width: '300px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfd' },
  sidebarHeader: { padding: '20px', borderBottom: '1px solid #eee' },
  lessonList: { flex: 1, overflowY: 'auto' },
  lessonGroup: { borderBottom: '1px solid #f0f0f0' },
  lessonTitle: { padding: '15px', backgroundColor: '#f9f9f9', fontSize: '14px' },
  lessonItem: { padding: '12px 20px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' },
  mainContent: { flex: 1, padding: '30px', overflowY: 'auto' },
  videoWrapper: { width: '100%', maxWidth: '900px', margin: '0 auto' },
  docWrapper: { textAlign: 'center', marginTop: '50px' },
  docPlaceholder: { width: '100%', height: '400px', backgroundColor: '#eee', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' },
  downloadBtn: { marginTop: 15, padding: '10px 20px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default LessonPage;