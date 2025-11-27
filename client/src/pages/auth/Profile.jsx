import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  
  // --- STATE QUẢN LÝ DỮ LIỆU FORM ---
  // Khởi tạo dữ liệu giả lập khớp với các trường trong SQL
  const [formData, setFormData] = useState({
    // Bảng USER_ACCOUNT
    UserName: user?.name || '',
    Email: user?.email || '',
    Gender: 'M',           // 'M' hoặc 'F'
    DateOfBirth: '2000-01-01',
    UserAge: 25,           // Tự tính hoặc lấy từ DB
    Join_Date: '2024-01-15',
    
    // Bảng STUDENT
    Major: 'Công nghệ thông tin',
    Education_Level: 'Đại học (Undergraduate)',
    
    // Bảng INSTRUCTOR
    Expertise: 'Lập trình Web & Mobile',
    Qualification: 'Thạc sĩ Khoa học máy tính',
    Bio: 'Giảng viên có 10 năm kinh nghiệm làm việc tại các tập đoàn lớn...',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm lưu (Giả lập gọi API UPDATE)
  const handleSave = () => {
    setIsEditing(false);
    alert("Đã cập nhật hồ sơ thành công! (Dữ liệu đã được lưu vào giả lập)");
    // Tại đây bạn sẽ gọi API: axios.put('/api/users/profile', formData)
  };

  if (!user) return <div style={{padding: 20}}>Vui lòng đăng nhập để xem hồ sơ.</div>;

  return (
    <div style={styles.container}>
      
      {/* --- 1. HEADER PROFILE --- */}
      <div style={styles.headerCard}>
        <div style={styles.avatarSection}>
          <img src={user.avatar} alt="Avatar" style={styles.avatarLarge} />
          <button style={styles.changeAvatarBtn}>📷 Đổi ảnh</button>
        </div>
        <div style={styles.headerInfo}>
          <h2 style={styles.name}>{formData.UserName}</h2>
          <div style={styles.roleBadge}>{user.role.toUpperCase()}</div>
          <p style={styles.joinDate}>Tham gia từ: {formData.Join_Date}</p>
        </div>
        <div style={styles.headerActions}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>✏️ Chỉnh sửa</button>
          ) : (
            <div style={{display:'flex', gap: 10}}>
              <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Hủy</button>
              <button onClick={handleSave} style={styles.saveBtn}>Lưu thay đổi</button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.gridContainer}>
        
        {/* --- 2. THÔNG TIN TÀI KHOẢN (Bảng USER_ACCOUNT) --- */}
        <div style={styles.sectionCard}>
          <h3 style={styles.sectionTitle}>📋 Thông tin cơ bản</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Họ và tên</label>
            <input 
              type="text" name="UserName"
              value={formData.UserName} onChange={handleChange}
              disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" name="Email"
                value={formData.Email} onChange={handleChange}
                disabled={true} // Email thường không cho sửa
                style={styles.inputDisabled}
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Giới tính</label>
              <select 
                name="Gender"
                value={formData.Gender} onChange={handleChange}
                disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
              >
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Ngày sinh</label>
              <input 
                type="date" name="DateOfBirth"
                value={formData.DateOfBirth} onChange={handleChange}
                disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Tuổi (Tự tính)</label>
              <input 
                type="text" value={formData.UserAge} disabled 
                style={styles.inputDisabled}
              />
            </div>
          </div>
        </div>

        {/* --- 3. THÔNG TIN CHUYÊN MÔN (Tùy Role) --- */}
        <div style={styles.sectionCard}>
          <h3 style={styles.sectionTitle}>
            {user.role === 'student' ? '🎓 Thông tin học vấn' : '👨‍🏫 Hồ sơ giảng viên'}
          </h3>

          {user.role === 'student' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Chuyên ngành (Major)</label>
                <input 
                  type="text" name="Major"
                  value={formData.Major} onChange={handleChange}
                  disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Trình độ (Education Level)</label>
                <select 
                  name="Education_Level"
                  value={formData.Education_Level} onChange={handleChange}
                  disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
                >
                  <option>Đại học (Undergraduate)</option>
                  <option>Sau đại học (Graduate)</option>
                  <option>Chứng chỉ (Certificate)</option>
                </select>
              </div>
            </>
          )}

          {user.role === 'teacher' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Chuyên môn (Expertise)</label>
                <input 
                  type="text" name="Expertise"
                  value={formData.Expertise} onChange={handleChange}
                  disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Bằng cấp (Qualification)</label>
                <input 
                  type="text" name="Qualification"
                  value={formData.Qualification} onChange={handleChange}
                  disabled={!isEditing} style={isEditing ? styles.input : styles.inputDisabled}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tiểu sử (Bio)</label>
                <textarea 
                  name="Bio" rows="4"
                  value={formData.Bio} onChange={handleChange}
                  disabled={!isEditing} style={isEditing ? styles.textarea : styles.textareaDisabled}
                ></textarea>
              </div>
            </>
          )}
          
          {/* Nút đổi mật khẩu */}
          <div style={{marginTop: 30, borderTop: '1px solid #eee', paddingTop: 20}}>
             <button style={styles.passwordBtn}>🔒 Đổi mật khẩu</button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLES (Tím Hồng & Nunito) ---
const styles = {
  container: {
    maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Nunito', sans-serif",
    backgroundColor: '#f8f9fa', minHeight: '100vh'
  },
  
  // Header Card
  headerCard: {
    backgroundColor: 'white', borderRadius: '20px', padding: '30px',
    display: 'flex', alignItems: 'center', gap: '30px',
    boxShadow: '0 4px 20px rgba(196, 113, 245, 0.15)',
    background: 'linear-gradient(to right, #ffffff, #fff0f5)', // Hiệu ứng loang nhẹ
    marginBottom: '30px',
    position: 'relative',
  },
  avatarSection: { position: 'relative' },
  avatarLarge: {
    width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover',
    border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  changeAvatarBtn: {
    position: 'absolute', bottom: '0', right: '0',
    backgroundColor: '#333', color: 'white', border: 'none',
    padding: '5px 10px', borderRadius: '15px', fontSize: '11px', cursor: 'pointer'
  },
  headerInfo: { flex: 1 },
  name: { fontSize: '28px', fontWeight: '800', color: '#333', margin: '0 0 5px 0' },
  roleBadge: {
    display: 'inline-block', backgroundColor: '#c471f5', color: 'white',
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
  },
  joinDate: { fontSize: '13px', color: '#888', marginTop: '10px' },
  
  headerActions: { display: 'flex', alignItems: 'center' },
  editBtn: {
    padding: '10px 20px', borderRadius: '25px', border: '1px solid #c471f5',
    color: '#c471f5', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  saveBtn: {
    padding: '10px 20px', borderRadius: '25px', border: 'none',
    color: 'white', background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    fontWeight: 'bold', cursor: 'pointer',
  },
  cancelBtn: {
    padding: '10px 20px', borderRadius: '25px', border: '1px solid #ddd',
    color: '#666', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer',
  },

  // Grid Layout
  gridContainer: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px',
    '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } // Mobile
  },
  sectionCard: {
    backgroundColor: 'white', borderRadius: '15px', padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #eee'
  },
  sectionTitle: {
    fontSize: '18px', fontWeight: '700', color: '#444', marginBottom: '20px',
    borderBottom: '2px solid #f0f0f0', paddingBottom: '10px'
  },
  
  // Form Elements
  formGroup: { marginBottom: '15px' },
  row: { display: 'flex', gap: '15px', marginBottom: '15px' },
  col: { flex: 1 },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '5px' },
  
  input: {
    width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #c471f5',
    outline: 'none', fontSize: '14px', fontFamily: 'inherit', backgroundColor: '#fff'
  },
  inputDisabled: {
    width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #eee',
    outline: 'none', fontSize: '14px', fontFamily: 'inherit', backgroundColor: '#f9f9f9', color: '#555'
  },
  textarea: {
    width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #c471f5',
    outline: 'none', fontSize: '14px', fontFamily: 'inherit', resize: 'none'
  },
  textareaDisabled: {
    width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #eee',
    outline: 'none', fontSize: '14px', fontFamily: 'inherit', resize: 'none', backgroundColor: '#f9f9f9'
  },
  passwordBtn: {
    width: '100%', padding: '10px', border: '1px dashed #999', borderRadius: '8px',
    color: '#666', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '600'
  }
};

export default Profile;