import { Link, useParams } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import { getOrder } from "../../utils/storage";

function OrderConfirmation() {
  const { id } = useParams();
  const order = getOrder(id);

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        {!order ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">📦</div>
            <h2>Order not found</h2>
            <p>This confirmation is not saved in this browser.</p>
            <Link to="/customer/orders" className="shop-button">View orders</Link>
          </div>
        ) : (
          <article className="order-card confirmation-card">
            <p className="form-success" role="status">Your order has been placed.</p>
            <h1>Order #{order.id}</h1>
            <p>Status: {order.status}</p>
            <p>Placed on {order.date}</p>
            <p>
              Delivering to {order.customer.name}, {order.customer.address}, {order.customer.city} - {order.customer.pincode}
            </p>
            {order.items.map((item) => (
              <div className="order-product" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
            <div className="order-total">Grand total: ₹{order.total}</div>
            <div className="hero-buttons">
              <Link to="/customer/orders" className="primary-btn">Track orders</Link>
              <Link to="/customer/shop" className="secondary-btn">Continue shopping</Link>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}

export default OrderConfirmation;
