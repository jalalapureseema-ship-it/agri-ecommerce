import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import { categoryName } from "../../data/catalog";
import { addToCart, getProduct } from "../../utils/storage";

function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(category, id);
  const [quantity, setQuantity] = useState(1);
  const [broken, setBroken] = useState(false);
  const [notice, setNotice] = useState("");

  if (!product) {
    return (
      <div className="customer-page">
        <CustomerNav />
        <section className="customer-section">
          <h1 className="page-title">Product not found</h1>
          <p>This listing is no longer available.</p>
          <Link to="/customer/shop" className="shop-button">Back to shop</Link>
        </section>
      </div>
    );
  }

  const stock = Number(product.available ?? product.quantity ?? 0);

  function handleAddToCart() {
    if (quantity < 1 || quantity > stock) return;
    addToCart(product, quantity);
    setNotice(`${product.name} added to cart.`);
    navigate("/customer/cart");
  }

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="product-details">
        <div className="product-image">
          {product.image && !broken ? (
            <img src={product.image} alt={product.name} onError={() => setBroken(true)} />
          ) : (
            product.icon || "🌾"
          )}
        </div>

        <div className="product-information">
          <span className="product-category">{categoryName(product.category)}</span>
          <h1>{product.name}</h1>
          <p className="product-price">₹{product.price} / {product.unit}</p>
          <p>{product.description}</p>
          <p><strong>Available stock:</strong> {stock} {product.unit}</p>
          <p><strong>Farmer:</strong> {product.farmer}</p>
          <p><strong>Location:</strong> {product.location}</p>
          {notice && <p className="form-success" role="status">{notice}</p>}

          <div className="quantity-box">
            <label htmlFor="product-quantity">Quantity ({product.unit})</label>
            <input
              id="product-quantity"
              type="number"
              min="1"
              max={stock}
              value={quantity}
              disabled={stock < 1}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isNaN(value)) return;
                setQuantity(Math.min(stock, Math.max(1, value)));
              }}
            />
          </div>

          <p className="product-price">Total: ₹{product.price * quantity}</p>
          <div className="product-buttons">
            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
              disabled={stock < 1 || quantity < 1}
            >
              {stock < 1 ? "Out of stock" : "🛒 Add to Cart"}
            </button>
            <Link to={`/customer/category/${product.category}`} className="buy-now-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
