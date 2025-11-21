import React from 'react';
import { Link } from 'react-router-dom'; 

function Login() {
  return (
    <div className="auth-container">
      <h2>Đăng Nhập</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Nhập email..." />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" placeholder="Nhập mật khẩu..." />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      
      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
}

export default Login;