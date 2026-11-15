import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomerNav from "../../components/CustomerNav";
import { cartTotals, getCart, getSession, placeOrder } from "../../utils/storage";

function Checkout() {
  const navigate = useNavigate();
  const session = getSession();
  const customer = session?.role === "customer" ? session : null;
  const [cart] = useState(() => getCart());
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    mobile: customer?.mobile || "",
    address: customer?.address || "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });
  const totals = cartTotals(cart);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (formData.name.trim().length < 2) {
      setError("Enter the recipient's full name.");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Enter a 10-digit mobile number.");
      return;
    }
    if (formData.address.trim().length < 5 || !formData.city.trim()) {
      setError("Enter a complete delivery address and city.");
      return;
    }
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError("Enter a 6-digit pincode.");
      return;
    }

    const result = placeOrder(formData, cart);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(`/customer/order-confirmation/${result.order.id}`);
  }

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        <h1 className="page-title">Checkout</h1>
        <p className="page-description">Review the cart and enter delivery details to confirm the order.</p>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Please add products before checkout.</p>
            <Link to="/customer/shop" className="shop-button">Continue Shopping</Link>
          </div>
        ) : (
          <div className="checkout-container">
            <div className="checkout-form">
              <h2>📦 Delivery Details</h2>
              {error && <p className="form-error" role="alert">{error}</p>}
              <form onSubmit={handleSubmit}>
                <label htmlFor="checkout-name">Full Name</label>
                <input id="checkout-name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />

                <label htmlFor="checkout-mobile">Mobile Number</label>
                <input id="checkout-mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile number" required />

                <label htmlFor="checkout-address">Delivery Address</label>
                <textarea id="checkout-address" name="address" rows="4" value={formData.address} onChange={handleChange} placeholder="Enter your complete address" required />

                <label htmlFor="checkout-city">City</label>
                <input id="checkout-city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" required />

                <label htmlFor="checkout-pincode">Pincode</label>
                <input id="checkout-pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" required />

                <label htmlFor="checkout-payment">Payment Method</label>
                <select id="checkout-payment" name="payment" value={formData.payment} onChange={handleChange}>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                <p className="payment-note">Online payment is not available in this version.</p>

                <button type="submit" className="place-order-button">Confirm Order</button>
              </form>
            </div>

            <div className="checkout-summary">
              <h2>🛒 Order Summary</h2>
              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div className="checkout-item-icon">{item.icon || "🌾"}</div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{totals.delivery === 0 ? "Free" : `₹${totals.delivery}`}</span>
              </div>
              <div className="checkout-total">
                <span>Grand total</span>
                <strong>₹{totals.grand}</strong>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Checkout;
