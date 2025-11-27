import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Lấy thông tin user để đăng bài

const ForumPage = () => {
  const { user } = useAuth(); // Lấy user đang đăng nhập

  // --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: "Trần Thị B", 
      role: "TEACHER",
      avatar: "https://i.pravatar.cc/150?img=11",
      content: "Chào các em, hôm nay chúng ta sẽ thảo luận về Normalization trong Database nhé. Ai có câu hỏi gì không?", 
      date: "2025-11-20 09:00",
      likes: 5,
      comments: 2
    },
    { 
      id: 2, 
      author: "Nguyễn Văn A", 
      role: "STUDENT",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "Thầy ơi cho em hỏi sự khác nhau giữa 3NF và BCNF với ạ? Em đọc tài liệu vẫn thấy hơi rối.", 
      date: "2025-11-20 10:15",
      likes: 2,
      comments: 1
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  // --- 2. XỬ LÝ ĐĂNG BÀI MỚI ---
  const handlePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: user ? user.name : "Khách ẩn danh", // Lấy tên thật
      role: user ? user.role.toUpperCase() : "GUEST",
      avatar: user ? user.avatar : "https://via.placeholder.com/40", // Lấy avatar thật
      content: newPostContent,
      date: new Date().toLocaleString(), // Lấy giờ hiện tại
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]); // Thêm vào đầu danh sách
    setNewPostContent(""); // Xóa ô nhập
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💬 Diễn Đàn Thảo Luận</h2>
        <p style={{color: '#666'}}>Nơi trao đổi kiến thức giữa Giảng viên và Sinh viên.</p>
      </div>
      
      {/* KHUNG ĐĂNG BÀI */}
      <div style={styles.inputBox}>
        <div style={styles.inputHeader}>
          <img 
            src={user ? user.avatar : "https://via.placeholder.com/40"} 
            alt="Avatar" 
            style={styles.myAvatar} 
          />
          <span style={{fontWeight: 'bold', color: '#555'}}>
            {user ? `${user.name} (${user.role})` : "Bạn chưa đăng nhập"}
          </span>
        </div>
        
        <textarea 
          rows="3" 
          placeholder="Bạn muốn chia sẻ hoặc hỏi gì hôm nay?..." 
          style={styles.textarea}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        
        <div style={styles.actionBar}>
          <button onClick={handlePost} style={styles.btn}>
            Gửi thảo luận 🚀
          </button>
        </div>
      </div>

      {/* DANH SÁCH BÀI ĐĂNG */}
      <div style={styles.feed}>
        {posts.map(post => (
          <div key={post.id} style={styles.postItem}>
            {/* Avatar người đăng */}
            <img src={post.avatar} alt="Avatar" style={styles.postAvatar} />
            
            <div style={{flex: 1}}>
              {/* Header bài đăng */}
              <div style={styles.postHeader}>
                <div>
                  <span style={styles.authorName}>{post.author}</span>
                  <span style={post.role === 'TEACHER' ? styles.tagTeacher : styles.tagStudent}>
                    {post.role}
                  </span>
                </div>
                <span style={styles.postDate}>{post.date}</span>
              </div>

              {/* Nội dung */}
              <p style={styles.postContent}>{post.content}</p>

              {/* Nút tương tác */}
              <div style={styles.interactions}>
                <span style={styles.actionLink}>❤️ {post.likes} Thích</span>
                <span style={styles.actionLink}>💬 {post.comments} Trả lời</span>
                <span style={styles.actionLink}>🔗 Chia sẻ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES (Tím hồng & Nunito) ---
const styles = {
  container: { 
    maxWidth: '800px', 
    margin: '0 auto', 
    // QUAN TRỌNG: Padding top lớn để tránh Navbar che mất
    padding: '100px 20px 40px 20px', 
    fontFamily: "'Nunito', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#c471f5',
    marginBottom: '5px',
  },
  
  // Khung nhập liệu
  inputBox: { 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '15px', 
    border: '1px solid #eee', 
    marginBottom: '30px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)' 
  },
  inputHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  myAvatar: {
    width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee'
  },
  textarea: { 
    width: '100%', 
    padding: '15px', 
    borderRadius: '10px', 
    border: '1px solid #e0e0e0', 
    outline: 'none', 
    fontFamily: 'inherit', 
    resize: 'none',
    fontSize: '15px',
    backgroundColor: '#fbfbfb',
    boxSizing: 'border-box' // Để padding không làm vỡ khung
  },
  actionBar: {
    textAlign: 'right', 
    marginTop: '10px'
  },
  btn: { 
    padding: '10px 25px', 
    background: 'linear-gradient(to right, #c471f5, #fa71cd)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '25px', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(196, 113, 245, 0.3)',
    transition: 'transform 0.2s',
  },

  // Danh sách bài viết
  feed: { display: 'flex', flexDirection: 'column', gap: '20px' },
  postItem: { 
    display: 'flex', 
    gap: '15px', 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '15px', 
    border: '1px solid #eee',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
  },
  postAvatar: { 
    width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee' 
  },
  postHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '8px'
  },
  authorName: {
    fontWeight: '800',
    color: '#333',
    fontSize: '16px',
    marginRight: '10px'
  },
  tagTeacher: {
    fontSize: '10px', fontWeight: 'bold', color: 'white', backgroundColor: '#e67e22', padding: '2px 6px', borderRadius: '4px'
  },
  tagStudent: {
    fontSize: '10px', fontWeight: 'bold', color: 'white', backgroundColor: '#3498db', padding: '2px 6px', borderRadius: '4px'
  },
  postDate: {
    fontSize: '12px', color: '#999'
  },
  postContent: {
    color: '#444',
    fontSize: '15px',
    lineHeight: '1.5',
    marginBottom: '15px'
  },
  interactions: {
    display: 'flex', gap: '20px', borderTop: '1px solid #f5f5f5', paddingTop: '10px'
  },
  actionLink: {
    fontSize: '13px', color: '#666', fontWeight: '600', cursor: 'pointer', transition: 'color 0.2s',
    ':hover': { color: '#c471f5' }
  }
};

export default ForumPage;