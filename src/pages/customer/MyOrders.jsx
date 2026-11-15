import { Link } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import { getCustomerOrders } from "../../utils/storage";

function MyOrders() {
  const orders = getCustomerOrders();

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        <h1 className="page-title">📦 My Orders</h1>
        <p className="page-description">View your previous orders and their details.</p>

        {orders.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">📦</div>
            <h2>No orders yet!</h2>
            <p>Your placed orders will appear here.</p>
            <Link to="/customer/shop" className="shop-button">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-header">
                  <h2>Order #{order.id}</h2>
                  <span className="order-status">{order.status}</span>
                </div>
                <p><strong>Order Date:</strong> {order.date}</p>
                <p><strong>Customer:</strong> {order.customer.name}</p>
                <p><strong>Mobile:</strong> {order.customer.mobile}</p>
                <p>
                  <strong>Delivery Address:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                </p>
                <p><strong>Payment Method:</strong> {order.customer.payment}</p>
                <h3>Products</h3>
                {order.items.map((item) => (
                  <div className="order-product" key={`${order.id}-${item.id}`}>
                    <span>{item.icon} {item.name} × {item.quantity} · {item.status || order.status}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal ?? order.total}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span>{order.delivery ? `₹${order.delivery}` : "Free"}</span>
                </div>
                <div className="order-total">Grand total: ₹{order.total}</div>
                <Link to={`/customer/order-confirmation/${order.id}`} className="view-product-button">
                  View confirmation
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyOrders;
