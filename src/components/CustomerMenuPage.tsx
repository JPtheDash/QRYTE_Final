import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface CartItem extends MenuItem {
  qty: number;
}

const CustomerMenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') || '7';

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Biryani', category: 'Mains', price: 250, description: 'Fragrant rice dish' },
    { id: 2, name: 'Butter Chicken', category: 'Mains', price: 320, description: 'Creamy chicken curry' },
    { id: 3, name: 'Dal Makhani', category: 'Mains', price: 180, description: 'Creamy lentil curry' },
    { id: 4, name: 'Garlic Naan', category: 'Breads', price: 60, description: 'Soft naan with garlic' },
    { id: 5, name: 'Paneer Tikka', category: 'Appetizers', price: 200, description: 'Grilled cottage cheese' },
    { id: 6, name: 'Samosa', category: 'Appetizers', price: 80, description: 'Crispy pastry with potato' },
    { id: 7, name: 'Gulab Jamun', category: 'Desserts', price: 100, description: 'Sweet milk solids' },
    { id: 8, name: 'Mango Lassi', category: 'Beverages', price: 120, description: 'Sweet yogurt drink' },
  ];

  const [cart, setCart] = useState<Record<number, CartItem>>({});
  const [couponCode, setCouponCode] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);

  // Group menu by category
  const categorizedMenu = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: (prev[item.id]?.qty || 0) + 1
      }
    }));
  };

  const handleUpdateQty = (itemId: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [itemId]: { ...prev[itemId], qty }
      }));
    }
  };

  const getTotalAmount = () => {
    return Object.values(cart).reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0);
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      alert('✅ Coupon applied! 10% discount');
    } else if (couponCode) {
      alert('❌ Invalid coupon code');
    }
  };

  const handlePlaceOrder = async () => {
    if (Object.keys(cart).length === 0) {
      alert('❌ Please add items to cart');
      return;
    }

    setLoading(true);
    try {
      const items = Object.values(cart).map(item => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price
      }));

      const payload = {
        tableNumber: parseInt(tableNumber),
        items,
        couponCode: couponCode || null,
        totalAmount: getTotalAmount()
      };

      const response = await api.placeCustomerOrder(payload);
      alert('✅ Order placed successfully! Order ID: ' + response.orderId);
      setCart({});
      setCouponCode('');
      setShowCart(false);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      alert('❌ Error placing order: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #4caf50',
        paddingBottom: '15px'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>📱 Customer Menu</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Table #{tableNumber}</p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🛒 Cart ({Object.keys(cart).length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Menu Section */}
        <div style={{ flex: 2 }}>
          {Object.entries(categorizedMenu).map(([category, items]) => (
            <div key={category} style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#4caf50', borderBottom: '2px solid #d0e7cd', paddingBottom: '10px' }}>
                {category}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    border: '1px solid #d0e7cd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h3>
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>{item.description}</p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}>
                      <span style={{ fontWeight: 'bold', color: '#4caf50', fontSize: '16px' }}>
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        style={{
                          padding: '5px 15px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ➕ Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {showCart && (
          <div style={{
            flex: 1,
            border: '2px solid #4caf50',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f1faf3',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <h2 style={{ margin: '0 0 15px 0', color: '#4caf50' }}>🛒 Your Cart</h2>

            {Object.values(cart).length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>Cart is empty</p>
            ) : (
              <>
                {Object.values(cart).map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #d0e7cd'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>{item.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>₹{item.price} x {item.qty}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                        style={{
                          padding: '3px 8px',
                          border: '1px solid #ccc',
                          background: 'white',
                          cursor: 'pointer',
                          borderRadius: '3px'
                        }}
                      >
                        −
                      </button>
                      <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                        style={{
                          padding: '3px 8px',
                          border: '1px solid #ccc',
                          background: 'white',
                          cursor: 'pointer',
                          borderRadius: '3px'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                {/* Coupon */}
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #d0e7cd' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>
                    Coupon Code (Try: SAVE10)
                  </label>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={applyCoupon}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div style={{
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '2px solid #d0e7cd',
                  backgroundColor: '#e8f5e9',
                  padding: '12px',
                  borderRadius: '5px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>
                    <span>Total:</span>
                    <span style={{ color: '#4caf50', fontSize: '18px' }}>₹{getTotalAmount()}</span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? '⏳ Placing...' : '✅ Place Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMenuPage;
