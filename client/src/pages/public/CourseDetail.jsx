import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  return (
    <div style={{ padding: '20px' }}>
      <h1>Chi tiết khóa học (ID: {id})</h1>
      <img src="https://via.placeholder.com/800x400" alt="Banner" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>Mô tả chi tiết khóa học sẽ hiện ở đây...</p>
      <button style={{ padding: '15px 30px', background: '#e67e22', color: 'white', border: 'none', fontSize: '18px' }}>Mua khóa học này</button>
    </div>
  );
};
export default CourseDetail;