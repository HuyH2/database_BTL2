import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Import Context

const Login = () => {
  // --- PHẦN LOGIC (Xử lý dữ liệu) ---
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Chặn load lại trang
    setError('');
    
    // Gọi hàm login giả lập
    const isSuccess = login(email, password);

    if (isSuccess) {
      navigate('/'); // Chuyển về trang chủ
    } else {
      setError('Sai thông tin rồi!');
    }
  };

  // --- PHẦN GIAO DIỆN (UI) ---
  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        
        <h2 style={styles.title}>ĐĂNG NHẬP</h2>

        {/* Form xử lý */}
        <form style={styles.form} onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Email (VD: nguyenvana@gmail.com)" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Mật khẩu (VD: 1)" 
            style={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Hiện lỗi màu đỏ nếu nhập sai */}
          {error && <p style={styles.errorMsg}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.footer}>
          <span style={styles.text}>
            Chưa có tài khoản? <Link to="/register" style={styles.link}>Đăng ký</Link>
          </span>
          <span style={{...styles.text, cursor: 'pointer'}}>Quên mật khẩu?</span>
        </div>

      </div>
    </div>
  );
};

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
    justifyContent: 'space-between',
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

export default Login;