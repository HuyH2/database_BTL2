import React from 'react';
import CourseCard from '../../components/CourseCard';

const CourseList = () => {
  // Dữ liệu giả
  const courses = [
    { id: 1, title: "ReactJS Cơ bản", price: 500000, image: "https://via.placeholder.com/300x200" },
    { id: 2, title: "NodeJS Nâng cao", price: 1200000, image: "https://via.placeholder.com/300x200" },
    { id: 3, title: "SQL Server 2022", price: 800000, image: "https://via.placeholder.com/300x200" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tất cả khóa học</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {courses.map(c => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  );
};
export default CourseList;