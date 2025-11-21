import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import CommentSection from '../../components/CommentSection';

const LessonPage = () => {
  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <div style={{ flex: 3, padding: '20px' }}>
        <VideoPlayer />
        <h2>Bài 1: Giới thiệu nhập môn</h2>
        <CommentSection />
      </div>
      <div style={{ flex: 1, borderLeft: '1px solid #ddd', padding: '20px' }}>
        <h3>Danh sách bài học</h3>
        <ul>
          <li>Bài 1: Giới thiệu</li>
          <li>Bài 2: Cài đặt môi trường</li>
          <li>Bài 3: Hello World</li>
        </ul>
      </div>
    </div>
  );
};
export default LessonPage;