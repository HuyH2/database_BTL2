import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Lấy dữ liệu giỏ hàng

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Giỏ hàng của bạn</h2>

      {/* TRƯỜNG HỢP 1: GIỎ HÀNG TRỐNG */}
      {cartItems.length === 0 ? (
        <div style={styles.emptyBlock}>
          <p style={{fontSize: '18px', color: '#666'}}>Giỏ hàng đang trống trơn...</p>
          <Link to="/courses">
            <button style={styles.continueBtn}>Tìm khóa học ngay</button>
          </Link>
        </div>
      ) : (
        
      /* TRƯỜNG HỢP 2: CÓ SẢN PHẨM */
        <div style={styles.content}>
          {/* Danh sách khóa học */}
          <div style={styles.list}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.item}>
                <img src={item.image} alt={item.title} style={styles.itemImg} />
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemPrice}>{item.price.toLocaleString()} đ</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={styles.removeBtn}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền & Thanh toán */}
          <div style={styles.summary}>
            <h3>Tổng cộng:</h3>
            <p style={styles.totalPrice}>{totalPrice.toLocaleString()} đ</p>
            <button 
              onClick={() => navigate('/checkout')} 
              style={styles.checkoutBtn}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles (Tím hồng & Nunito)
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Nunito', sans-serif",
    minHeight: '80vh',
  },
  heading: {
    borderBottom: '2px solid #eee',
    paddingBottom: '15px',
    marginBottom: '20px',
    color: '#333',
  },
  emptyBlock: {
    textAlign: 'center',
    marginTop: '50px',
  },
  content: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  list: {
    flex: 2, 
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
  },
  itemImg: {
    width: '100px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginRight: '15px',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '16px',
    margin: '0 0 5px 0',
    color: '#333',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#e74c3c',
    margin: 0,
  },
  removeBtn: {
    padding: '5px 10px',
    background: '#fff',
    border: '1px solid #e74c3c',
    color: '#e74c3c',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  
  summary: {
    flex: 1, 
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    height: 'fit-content',
    border: '1px solid #eee',
  },
  totalPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(196, 113, 245, 0.4)',
  },
  continueBtn: {
    padding: '10px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default Cart;