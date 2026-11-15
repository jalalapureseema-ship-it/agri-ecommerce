
import { Link } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  // Update cart and localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = cart
      .map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove product
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="customer-page">

      <nav className="customer-navbar">
        <div className="customer-logo">🌾 AgriMart</div>

        <div className="customer-nav-links">
          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/cart">🛒 Cart</Link>
          <Link to="/customer/orders">My Orders</Link>
        </div>
      </nav>

      <section className="customer-section">

        <h1 className="page-title">🛒 My Cart</h1>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>Add some fresh products from our farmers.</p>

            <Link
              to="/customer/categories"
              className="shop-button"
            >
              Start Shopping
            </Link>
          </div>

        ) : (

          <div className="cart-container">

            <div className="cart-items">

              {cart.map((item, index) => (

                <div className="cart-item" key={item.id || index}>

                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      item.icon || "🌾"
                    )}
                  </div>

                  <div className="cart-item-details">

                    <h2>{item.name}</h2>

                    <p>👨‍🌾 {item.farmer}</p>

                    <p>₹{item.price} / {item.unit}</p>

                    <div className="quantity-controls">

                      <button
                        type="button"
                        onClick={() => decreaseQuantity(index)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(index)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="cart-item-total">

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      className="remove-cart-button"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link
                to="/customer/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
              </Link>

            </div>

          </div>

        )}

      </section>
    </div>
  );
}

export default Cart;
