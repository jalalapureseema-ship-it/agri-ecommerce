import { Link } from "react-router-dom";
import { useState } from "react";
import CustomerNav from "../../components/CustomerNav";
import { cartTotals, getCart, saveCart } from "../../utils/storage";

function CartItemImage({ item }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="cart-item-image">
      {item.image && !broken ? (
        <img src={item.image} alt={item.name} onError={() => setBroken(true)} />
      ) : (
        item.icon || "🌾"
      )}
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState(() => getCart());
  const totals = cartTotals(cart);

  function update(next) {
    setCart(saveCart(next));
  }

  function changeQuantity(index, delta) {
    const next = cart
      .map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        const available = Number(item.available ?? 99);
        return {
          ...item,
          quantity: Math.min(available, item.quantity + delta),
        };
      })
      .filter((item) => item.quantity > 0);
    update(next);
  }

  function removeFromCart(index) {
    update(cart.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        <h1 className="page-title">🛒 My Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some fresh products from our farmers.</p>
            <Link to="/customer/shop" className="shop-button">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <CartItemImage item={item} />
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>👨‍🌾 {item.farmer}</p>
                    <p>₹{item.price} / {item.unit}</p>
                    <div className="quantity-controls">
                      <button type="button" onClick={() => changeQuantity(index, -1)} aria-label="Decrease quantity">-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(index, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <strong>₹{item.price * item.quantity}</strong>
                    <button type="button" className="remove-cart-button" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{totals.delivery === 0 ? "Free" : `₹${totals.delivery}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Grand total</span>
                <span>₹{totals.grand}</span>
              </div>
              <p className="delivery-note">Delivery is free on orders of ₹500 or more.</p>
              <Link to="/customer/checkout" className="checkout-button">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
