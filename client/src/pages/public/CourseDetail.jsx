import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getCourseById } from '../../api/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    // Giả lập gọi API
    getCourseById(id).then(data => setCourse(data));
  }, [id]);

  const handleBuyCourse = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để mua khóa học này!");
      navigate('/login');
    } else {
      // Thêm vào giỏ
      addToCart(course);
      // Chuyển sang trang giỏ hàng
      navigate('/cart');
    }
  };

  if (!course) return <div style={{padding: 20}}>Đang tải thông tin...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{course.title}</h1>
      <img src={course.image} alt={course.title} style={styles.banner} />
      
      {/* Format giá tiền có dấu chấm phân cách */}
      <p style={styles.price}>{course.price.toLocaleString()} đ</p>
      
      <p style={styles.desc}>{course.description}</p>
      
      <button onClick={handleBuyCourse} style={styles.buyBtn}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Nunito', sans-serif",
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#333',
  },
  banner: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  // Thêm style cho giá tiền nổi bật
  price: {
    fontSize: '24px',
    color: '#e74c3c', 
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  desc: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '30px',
  },
  buyBtn: {
    padding: '15px 40px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)', 
    color: 'white', 
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(242, 153, 74, 0.4)',
    transition: 'transform 0.2s',
  }
};

export default CourseDetail;