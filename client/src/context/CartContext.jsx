import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Lấy dữ liệu từ LocalStorage khi web vừa chạy lên (để không bị mất khi F5)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Lưu vào LocalStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- CÁC HÀM XỬ LÝ ---
  
  // Thêm vào giỏ
  const addToCart = (course) => {
    // Kiểm tra xem khóa học đã có trong giỏ chưa
    const isExist = cartItems.find(item => item.id === course.id);
    
    if (isExist) {
      alert("Khóa học này đã có trong giỏ hàng rồi!");
    } else {
      setCartItems([...cartItems, course]);
      alert("Đã thêm vào giỏ hàng thành công! 🛒");
    }
  };

  // Xóa khỏi giỏ
  const removeFromCart = (courseId) => {
    const newCart = cartItems.filter(item => item.id !== courseId);
    setCartItems(newCart);
  };

  // Xóa hết (khi thanh toán xong)
  const clearCart = () => setCartItems([]);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);