import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/auth'; // Import API

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái đang tải

  // Kiểm tra đăng nhập khi vừa vào web (F5)
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.success) {
            setUser(res.user);
          }
        } catch (error) {
          console.log("Hết phiên đăng nhập");
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  // Hàm Login gọi API
  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      
      if (res.success) {
        setUser(res.user); // Lưu thông tin user vào state
        localStorage.setItem('token', res.token); // Lưu token vào ổ cứng
        return { success: true };
      }
    } catch (error) {
      // Trả về lỗi từ server (VD: Sai mật khẩu)
      return { 
        success: false, 
        message: error.response?.data?.message || "Lỗi kết nối server!" 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);