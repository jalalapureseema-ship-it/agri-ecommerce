
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <div className="customer-page">

      {/* Navbar */}
      <nav className="customer-navbar">
        <div className="customer-logo">🌾 AgriMart</div>

        <div className="customer-nav-links">
          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/cart">🛒 Cart</Link>
          <Link to="/customer/orders">My Orders</Link>
        </div>
      </nav>

      {/* Orders */}
      <section className="customer-section">
        <h1 className="page-title">📦 My Orders</h1>

        <p className="page-description">
          View your previous orders and their details.
        </p>

        {orders.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">📦</div>
            <h2>No orders yet!</h2>
            <p>Your placed orders will appear here.</p>

            <Link
              to="/customer/categories"
              className="shop-button"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <h2>Order #{order.id}</h2>
                  <span className="order-status">
                    {order.status}
                  </span>
                </div>

                <p>
                  <strong>Order Date:</strong>{" "}
                  {order.date}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.customer.name}
                </p>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {order.customer.mobile}
                </p>

                <p>
                  <strong>Delivery Address:</strong>{" "}
                  {order.customer.address},{" "}
                  {order.customer.city} -{" "}
                  {order.customer.pincode}
                </p>

                <p>
                  <strong>Payment Method:</strong>{" "}
                  {order.customer.payment}
                </p>

                <h3>Products</h3>

                {order.items.map((item, index) => (
                  <div
                    className="order-product"
                    key={index}
                  >
                    <span>
                      {item.icon} {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                ))}

                <div className="order-total">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyOrders;