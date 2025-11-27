import React from 'react';

const CreateCourse = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tạo khóa học mới</h2>
      <form>
        <div style={{ marginBottom: 15 }}>
          <label>Tên khóa học:</label>
          <input type="text" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Giá tiền:</label>
          <input type="number" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Mô tả:</label>
          <textarea style={{ width: '100%', padding: 8, height: 100 }}></textarea>
        </div>
        <button style={{ padding: '10px 20px', background: 'blue', color: 'white' }}>Tạo khóa học</button>
      </form>
    </div>
  );
};
export default CreateCourse;