import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//  Giả lập Database User để kiểm tra (Sau này thay bằng API)
const MOCK_EMAILS = ['nguyenvana@gmail.com', 'nguyenvanb@gmail.com', 'nguyenvanc@gmail.com'];

const Forgot = () => {
  // --- STATE ---
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // State cho bộ đếm ngược
  const [countdown, setCountdown] = useState(0);

  // --- EFFECT: Xử lý đếm ngược ---
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // --- HÀM KIỂM TRA EMAIL HỢP LỆ (REGEX) ---
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // --- XỬ LÝ GỬI ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // 1. Kiểm tra rỗng
    if (!email) {
      setError('Vui lòng nhập email!');
      return;
    }

    // 2. Kiểm tra định dạng email
    if (!validateEmail(email)) {
      setError('Email không đúng định dạng (VD: abc@gmail.com)');
      return;
    }

    // 3. Kiểm tra email có tồn tại trong hệ thống không?
    if (!MOCK_EMAILS.includes(email)) {
      setError('Email này chưa được đăng ký trong hệ thống!');
      return;
    }

    // 4. Gửi thành công -> Bắt đầu đếm ngược
    setMessage(`Link khôi phục đã được gửi tới: ${email}`);
    setCountdown(60); // Đếm ngược 60 giây
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        
        <h2 style={styles.title}>QUÊN MẬT KHẨU</h2>
        
        <p style={styles.instruction}>
          Nhập email để lấy lại mật khẩu.
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Nhập email của bạn" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={countdown > 0} // Không cho sửa email khi đang đếm ngược
          />
          
          {error && <p style={styles.errorMsg}>⚠️ {error}</p>}
          {message && <p style={styles.successMsg}>✅ {message}</p>}

          {/* Nút bấm biến hình khi đếm ngược */}
          <button 
            type="submit" 
            style={countdown > 0 ? styles.disabledButton : styles.button}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi yêu cầu'}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={styles.text}>
            <Link to="/login" style={styles.link}>Quay lại Đăng nhập</Link>
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
    fontSize: '24px', fontWeight: '800', color: 'black', marginBottom: '10px', 
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  instruction: {
    fontSize: '14px', color: '#333', marginBottom: '20px', lineHeight: '1.4',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    width: '100%', padding: '10px 20px', borderRadius: '30px', border: 'none',
    outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif",
    boxSizing: 'border-box', backgroundColor: 'white',
  },
  button: {
    width: '160px', // Rộng hơn chút để chứa chữ đếm ngược
    padding: '10px', margin: '10px auto 0', borderRadius: '30px', border: 'none',
    backgroundColor: 'white', color: '#c471f5', fontSize: '16px',
    fontWeight: '800', cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s',
  },
  //  Style nút khi bị khóa (đang đếm ngược)
  disabledButton: {
    width: '160px', padding: '10px', margin: '10px auto 0', borderRadius: '30px', border: 'none',
    backgroundColor: '#e0e0e0', // Màu xám
    color: '#888',              // Chữ xám
    fontSize: '14px', fontWeight: '700', cursor: 'not-allowed', // Con trỏ cấm
    fontFamily: "'Nunito', sans-serif",
  },
  footer: {
    marginTop: '20px', display: 'flex', justifyContent: 'center',
    fontSize: '12px', color: 'black', fontWeight: '600',
  },
  text: { color: 'black' },
  link: {
    color: 'black', fontWeight: '800', textDecoration: 'none', marginLeft: '5px',
  },
  errorMsg: {
    color: '#8b0000', backgroundColor: 'rgba(255,255,255,0.6)', padding: '8px',
    borderRadius: '10px', fontSize: '13px', margin: 0, fontWeight: 'bold'
  },
  successMsg: {
    color: '#006400', backgroundColor: 'rgba(255,255,255,0.8)', padding: '8px',
    borderRadius: '10px', fontSize: '13px', margin: 0, fontWeight: 'bold'
  }
};

export default Forgot;