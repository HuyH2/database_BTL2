import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Đăng nhập</h2>
      <input type="email" placeholder="Email" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
      <input type="password" placeholder="Mật khẩu" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
      <button style={{ width: '100%', padding: '10px', background: '#27ae60', color: 'white', border: 'none' }}>Đăng nhập</button>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </div>
  );
};
export default Login;