import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Danh sách tài khoản giả lập (Giống như Database)
const MOCK_USERS = [
  { 
    id: 1, 
    email: 'nguyenvana@gmail.com', 
    password: '1', 
    name: 'Nguyễn Văn A', 
    role: 'student', 
    avatar: 'https://i.pravatar.cc/150?img=3' 
  },
  { 
    id: 2, 
    email: 'nguyenvanb@gmail.com', 
    password: '2', 
    name: 'Nguyễn Văn B', 
    role: 'teacher', 
    avatar: 'https://i.pravatar.cc/150?img=11' 
  },
  { 
    id: 3, 
    email: 'nguyenvanc@gmail.com', 
    password: '3', 
    name: 'Nguyễn Văn C', 
    role: 'admin', 
    avatar: 'https://i.pravatar.cc/150?img=68' 
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  // Hàm login bây giờ nhận Email và Password
  const login = (email, password) => {
    // Tìm kiếm user trong danh sách giả
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true; // Đăng nhập thành công
    } else {
      return false; // Sai email hoặc mật khẩu
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);