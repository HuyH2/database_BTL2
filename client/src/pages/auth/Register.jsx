import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // --- 1. STATE LƯU DỮ LIỆU ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // --- 2. XỬ LÝ ĐĂNG KÝ ---
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra dữ liệu cơ bản
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }

    // Giả lập đăng ký thành công (Vì chưa có Backend)
    // Sau này sẽ gọi API đăng ký ở đây
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  // --- 3. GIAO DIỆN (UI) ---
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
          
          {/* Hiện lỗi màu đỏ nếu có */}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%', 
    backgroundColor: '#fff',
    fontFamily: "'Nunito', sans-serif",
    margin: 0, padding: 0, 
    overflow: 'hidden',
  },
  loginBox: {
    width: '320px',
    padding: '30px 25px', 
    background: 'linear-gradient(to right, #c471f5 0%, #fa71cd 100%)',
    borderRadius: '25px', 
    boxShadow: '0 10px 25px rgba(196, 113, 245, 0.5)',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '24px', 
    fontWeight: '800',
    color: 'black', 
    marginBottom: '20px', 
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', 
  },
  input: {
    width: '100%',
    padding: '10px 20px', 
    borderRadius: '30px',
    border: 'none',
    outline: 'none',
    fontSize: '14px', 
    fontFamily: "'Nunito', sans-serif",
    boxSizing: 'border-box',
    backgroundColor: 'white',
  },
  button: {
    width: '120px', 
    padding: '10px',
    margin: '10px auto 0',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: 'white',
    color: '#c471f5', 
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  footer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'black',
    fontWeight: '600',
  },
  text: {
    color: 'black', 
  },
  link: {
    color: 'black',
    fontWeight: '800',
    textDecoration: 'none',
    marginLeft: '5px',
  },
  errorMsg: {
    color: '#8b0000', 
    backgroundColor: 'rgba(255,255,255,0.5)', 
    padding: '5px',
    borderRadius: '10px',
    fontSize: '13px',
    margin: 0,
    fontWeight: 'bold'
  }
};

export default Register;