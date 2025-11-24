import React, { useState } from 'react';

const StudentDashboard = () => {
  // --- 1. DỮ LIỆU SỰ KIỆN (Mock Data) ---
  const upcomingEvents = [
    {
      id: 1,
      date: '2025-11-25',
      time: '23:30',
      type: 'Quiz',
      title: 'QUIZ 9 - Normalization',
      course: 'Hệ cơ sở Dữ liệu',
    },
    {
      id: 2,
      date: '2025-11-07',
      time: '23:59',
      type: 'Assignment',
      title: 'Bài tập lớn BTL2',
      course: 'Lập trình Web',
    }
  ];

  // --- 2. LOGIC XỬ LÝ LỊCH ---
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatMonthYear = (date) => {
    // Lưu ý: getMonth() trả về 0-11 nên phải +1 để hiện thị đúng
    return `Tháng ${date.getMonth() + 1} ${date.getFullYear()}`;
  };

  const checkEvent = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    return upcomingEvents.find(e => e.date === dateString);
  };

  // Kiểm tra xem có phải "Hôm nay" không để tô màu
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Bảng Điều khiển</h2>

      <div style={styles.gridContainer}>
        
        {/* CỘT TRÁI: TIMELINE */}
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>⏳ Mốc thời gian</h3>
            <div style={styles.timelineList}>
              {upcomingEvents.map((event) => (
                <div key={event.id} style={styles.eventItem}>
                  <div style={styles.dateHeader}>Ngày {event.date}</div>
                  <div style={styles.eventContent}>
                    <div style={styles.eventIcon}>{event.icon}</div>
                    <div style={styles.eventInfo}>
                      <div style={{fontWeight:'bold'}}>{event.title}</div>
                      <div style={styles.courseName}>{event.course}</div>
                    </div>
                    <button style={styles.actionBtn}>Chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: LỊCH */}
        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h3 style={styles.sectionTitle}>📅 Lịch</h3>
            </div>
            
            <div style={styles.calendarHeader}>
              <button onClick={prevMonth} style={styles.navBtn}>« Trước</button>
              <span style={{fontWeight: 'bold', color: '#c471f5', fontSize: '16px'}}>
                {formatMonthYear(currentDate)}
              </span>
              <button onClick={nextMonth} style={styles.navBtn}>Sau »</button>
            </div>

            <div style={styles.calendarGrid}>
              {/* Header Thứ */}
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                <div key={day} style={styles.dayName}>{day}</div>
              ))}
              
              {/* Vẽ các ô trống trước ngày mùng 1 */}
              {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
                <div key={`empty-${index}`} style={styles.calendarCell}></div>
              ))}

              {/* Vẽ các ngày trong tháng */}
              {getDaysInMonth(currentDate).map(day => {
                const event = checkEvent(day);
                const todayStyle = isToday(day) ? styles.todayCell : {}; // Tô màu nếu là hôm nay

                return (
                  <div key={day} style={{...styles.calendarCell, ...todayStyle}}>
                    <span style={{fontSize: '12px', color: isToday(day) ? 'white' : '#666', fontWeight: isToday(day) ? 'bold' : 'normal'}}>
                      {day}
                    </span>
                    {event && (
                      <div style={styles.dotEvent} title={event.title}>
                        {event.type}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { padding: '20px 40px', fontFamily: "'Nunito', sans-serif", backgroundColor: '#f8f9fa', minHeight: '100vh' },
  pageTitle: { fontSize: '28px', fontWeight: '800', color: '#c471f5', marginBottom: '20px' },
  gridContainer: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' },
  card: { backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '15px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' },
  
  // Timeline
  eventItem: { marginBottom: '15px' },
  dateHeader: { fontSize: '13px', color: '#888', marginBottom: '5px' },
  eventContent: { display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: '8px' },
  eventIcon: { fontSize: '20px', marginRight: '10px' },
  eventInfo: { flex: 1 },
  courseName: { fontSize: '12px', color: '#999' },
  actionBtn: { padding: '5px 10px', border: '1px solid #c471f5', color: '#c471f5', backgroundColor: 'white', borderRadius: '15px', cursor: 'pointer', fontSize: '12px' },

  // Calendar
  calendarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  navBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#666', fontWeight: 'bold' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid #eee', borderLeft: '1px solid #eee' },
  dayName: { padding: '10px 0', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#888', borderBottom: '1px solid #eee', borderRight: '1px solid #eee' },
  
  calendarCell: { height: '50px', padding: '5px', borderBottom: '1px solid #eee', borderRight: '1px solid #eee', position: 'relative', backgroundColor: 'white' },
  
  // Style đặc biệt cho ngày hôm nay (Màu tím hồng)
  todayCell: {
    backgroundColor: '#c471f5',
    color: 'white',
    borderRadius: '0',
  },

  dotEvent: {
    marginTop: '2px', fontSize: '9px', backgroundColor: '#ffecec', color: '#e74c3c',
    padding: '2px 4px', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
  }
};

export default StudentDashboard;