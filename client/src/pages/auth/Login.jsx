import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div style={styles.container}>
      {/* Khối Gradient chính */}
      <div style={styles.loginBox}>
        
        {/* Tiêu đề */}
        <h2 style={styles.title}>ĐĂNG NHẬP</h2>

        {/* Form nhập liệu */}
        <form style={styles.form}>
          <input 
            type="text" 
            placeholder="Email" 
            style={styles.input} 
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            style={styles.input} 
          />
          
          {/* Nút Login */}
          <button style={styles.button}>Login</button>
        </form>

        {/* Footer: Đăng ký & Quên mật khẩu */}
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
    backgroundColor: '#fff',
    fontFamily: "'Nunito', sans-serif",
  },
  loginBox: {
    width: '320px',
    padding: '30px 25px', 
    
    background: 'linear-gradient(to right,  #c471f5 0%, #fa71cd 100%)',
    borderRadius: '25px', 
    boxShadow: '0 10px 25px rgba(143, 172, 254, 0.5)',
    textAlign: 'center',
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
    color: 'black',
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
  }
};

export default Login;