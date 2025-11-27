import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  // Dữ liệu giả phòng trường hợp không truyền props
  const { id, title, price, image } = course || { 
    id: 1, title: "Khóa học mẫu", price: 0, image: "https://via.placeholder.com/300x200" 
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', width: '250px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '16px', margin: '0 0 10px' }}>{title}</h3>
        <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{price.toLocaleString()} đ</p>
        <Link to={`/courses/${id}`}>
          <button style={{ width: '100%', padding: '8px', background: 'linear-gradient(to right, #c471f5, #fa71cd)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xem ngay</button>
        </Link>
      </div>
    </div>
  );
};
export default CourseCard;