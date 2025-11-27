import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/auth'; // Import trực tiếp API

const Register = () => {
  const navigate = useNavigate();
  // ... (các state name, email, password, confirmPassword, role giữ nguyên) ...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validate cơ bản ở client
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    try {
      // GỌI API ĐĂNG KÝ
      const res = await authApi.register({ 
        userName: name, // Chú ý tên trường phải khớp với Backend (userName hay name)
        email, 
        password, 
        role 
      });

      if (res.success) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate('/login');
      }
    } catch (err) {
      // Lấy lỗi từ backend (ví dụ: Email đã tồn tại)
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  // --- 3. GIAO DIỆN ---
  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        
        <h2 style={styles.title}>ĐĂNG KÝ</h2>

        <form style={styles.form} onSubmit={handleRegister}>
          
          {/* Ô nhập Họ tên */}
          <input 
            type="text" 
            placeholder="Họ và tên" 
            style={styles.input} 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Ô nhập Email */}
          <input 
            type="text" 
            placeholder="Email" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Ô nhập Mật khẩu */}
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            style={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Ô nhập lại Mật khẩu */}
          <input 
            type="password" 
            placeholder="Nhập lại mật khẩu" 
            style={styles.input} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/*CHỌN VAI TRÒ */}
          <div style={styles.roleContainer}>
            <label style={styles.radioLabel}>
              <input 
                type="radio" 
                value="student" 
                checked={role === 'student'} 
                onChange={() => setRole('student')} 
                style={styles.radioInput}
              />
              Học viên
            </label>
            <label style={styles.radioLabel}>
              <input 
                type="radio" 
                value="teacher" 
                checked={role === 'teacher'} 
                onChange={() => setRole('teacher')} 
                style={styles.radioInput}
              />
              Giáo viên
            </label>
          </div>
          
          {/* Hiện lỗi */}
          {error && <p style={styles.errorMsg}>{error}</p>}

          <button type="submit" style={styles.button}>Đăng ký</button>
        </form>

        <div style={styles.footer}>
          <span style={styles.text}>
            Đã có tài khoản? <Link to="/login" style={styles.link}>Đăng nhập ngay</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

// --- STYLE ---
const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', width: '100%', backgroundColor: '#fff',
    fontFamily: "'Nunito', sans-serif", margin: 0, padding: 0, overflow: 'hidden',
  },
  loginBox: {
    width: '320px', padding: '30px 25px', 
    background: 'linear-gradient(to right, #c471f5 0%, #fa71cd 100%)',
    borderRadius: '25px', boxShadow: '0 10px 25px rgba(196, 113, 245, 0.5)',
    textAlign: 'center', boxSizing: 'border-box',
  },
  title: {
    fontSize: '24px', fontWeight: '800', color: 'black', marginBottom: '20px', 
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    width: '100%', padding: '10px 20px', borderRadius: '30px', border: 'none',
    outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif",
    boxSizing: 'border-box', backgroundColor: 'white',
  },
  
  roleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: '14px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radioInput: {
    marginRight: '5px',
    cursor: 'pointer',
    accentColor: '#fff',
  },

  button: {
    width: '120px', padding: '10px', margin: '10px auto 0', borderRadius: '30px',
    border: 'none', backgroundColor: 'white', color: '#c471f5', fontSize: '16px',
    fontWeight: '800', cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s',
  },
  footer: {
    marginTop: '20px', display: 'flex', justifyContent: 'center',
    fontSize: '12px', color: 'black', fontWeight: '600',
  },
  text: { color: 'black' },
  link: { color: 'black', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' },
  errorMsg: {
    color: '#8b0000', backgroundColor: 'rgba(255,255,255,0.5)', padding: '5px',
    borderRadius: '10px', fontSize: '13px', margin: 0, fontWeight: 'bold'
  }
};

export default Register;