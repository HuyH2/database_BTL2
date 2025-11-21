import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="auth-container">
      <h2>Tạo tài khoản học viên</h2>
      <form>
        <div>
          <label>Họ và tên:</label>
          <input type="text" placeholder="Nguyễn Văn A" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" />
        </div>
        <div>
          <label>Nhập lại mật khẩu:</label>
          <input type="password" />
        </div>
        <button type="submit">Đăng ký</button>
      </form>

      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
      </p>
    </div>
  );
}

export default Register;