import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/customer/categories");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      customer: formData,
      total: total,
      status: "Order Placed",
      date: new Date().toLocaleDateString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear cart after placing order
    localStorage.removeItem("cart");

    alert("🎉 Your order has been placed successfully!");

    navigate("/customer/orders");
  };

  return (
    <div className="customer-page">

      {/* ================= NAVBAR ================= */}

      <nav className="customer-navbar">

        <div className="customer-logo">
          🌾 AgriMart
        </div>

        <div className="customer-nav-links">
          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">
            Categories
          </Link>
          <Link to="/customer/cart">
            🛒 Cart
          </Link>
          <Link to="/customer/orders">
            My Orders
          </Link>
        </div>

      </nav>


      {/* ================= CHECKOUT ================= */}

      <section className="customer-section">

        <h1 className="page-title">
          Checkout
        </h1>

        <p className="page-description">
          Enter your delivery details to place your order.
        </p>


        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Please add products before checkout.
            </p>

            <Link
              to="/customer/categories"
              className="shop-button"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="checkout-container">

            {/* ================= DELIVERY FORM ================= */}

            <div className="checkout-form">

              <h2>
                📦 Delivery Details
              </h2>

              <form onSubmit={handleSubmit}>

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />


                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />


                <label>
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />


                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />


                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />


                <label>
                  Payment Method
                </label>

                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Card">
                    Credit / Debit Card
                  </option>
                </select>


                <button
                  type="submit"
                  className="place-order-button"
                >
                  Place Order
                </button>

              </form>

            </div>


            {/* ================= ORDER SUMMARY ================= */}

            <div className="checkout-summary">

              <h2>
                🛒 Order Summary
              </h2>


              {cart.map((item, index) => (

                <div
                  className="checkout-item"
                  key={index}
                >

                  <div className="checkout-item-icon">
                    {item.icon}
                  </div>

                  <div>
                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}


              <div className="checkout-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>

            </div>

          </div>

        )}

      </section>

    </div>
  );
}

export default Checkout;