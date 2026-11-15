import { useState } from "react";
import FarmerNav from "../../components/FarmerNav";
import { getFarmerOrders, getSession, updateFarmerOrderStatus } from "../../utils/storage";

const statuses = ["Order Placed", "Packed", "Shipped", "Delivered"];

function FarmerOrders() {
  const session = getSession();
  const [orders, setOrders] = useState(() => getFarmerOrders(session?.email || ""));

  function changeStatus(orderId, status) {
    setOrders(updateFarmerOrderStatus(orderId, session.email, status));
  }

  return (
    <div className="dashboard-page">
      <FarmerNav />
      <h1>🛒 Customer Orders</h1>
      <p>Orders received for your products will appear here.</p>

      {orders.length === 0 ? (
        <div className="empty-products">
          <div>🛒</div>
          <h2>No Orders Yet</h2>
          <p>You don&apos;t have any customer orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const mine = order.items.filter((item) => item.farmerEmail === session.email);
            const status = mine[0]?.status || order.status;
            return (
              <article className="order-card" key={order.id}>
                <div className="order-header">
                  <h2>Order #{order.id}</h2>
                  <span className="order-status">{status}</span>
                </div>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Customer:</strong> {order.customer.name}</p>
                <p><strong>Mobile:</strong> {order.customer.mobile}</p>
                <p>
                  <strong>Delivery:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                </p>
                <p><strong>Payment:</strong> {order.customer.payment}</p>
                {mine.map((item) => (
                  <div className="order-product" key={item.id}>
                    <span>{item.icon} {item.name} × {item.quantity}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
                <label className="status-label" htmlFor={`status-${order.id}`}>Update status</label>
                <select
                  id={`status-${order.id}`}
                  value={status}
                  onChange={(event) => changeStatus(order.id, event.target.value)}
                >
                  {statuses.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FarmerOrders;
