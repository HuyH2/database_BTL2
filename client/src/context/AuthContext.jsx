import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Khởi tạo user là null (chưa đăng nhập)
  // Để test, bạn có thể đổi null thành { name: 'Huy', role: 'student' }
  const [user, setUser] = useState(null); 

  // Hàm đăng nhập giả lập (Nhận vào role muốn test)
  const login = (role) => {
    if (role === 'student') {
      setUser({ id: 1, name: 'Nguyễn Văn A', role: 'student', avatar: 'https://i.pravatar.cc/150?img=3' });
    } else if (role === 'teacher') {
      setUser({ id: 2, name: 'Thầy Ba', role: 'teacher', avatar: 'https://i.pravatar.cc/150?img=11' });
    } else if (role === 'admin') {
      setUser({ id: 3, name: 'Admin', role: 'admin', avatar: 'https://i.pravatar.cc/150?img=68' });
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