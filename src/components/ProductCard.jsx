import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/storage";

function ProductCard({ product }) {
  const [broken, setBroken] = useState(false);
  const [added, setAdded] = useState(false);
  const stock = Number(product.available ?? product.quantity ?? 0);

  function handleAdd() {
    if (stock < 1) return;
    addToCart(product, 1);
    setAdded(true);
  }

  return (
    <article className="product-card">
      <div className="product-card-image">
        {product.image && !broken ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setBroken(true)}
          />
        ) : (
          product.icon || "🌾"
        )}
      </div>

      <h2>{product.name}</h2>
      <p className="product-card-price">
        ₹{product.price} / {product.unit}
      </p>
      <p>👨‍🌾 {product.farmer}</p>
      <p>
        Available: {stock} {product.unit}
      </p>

      <div className="card-actions">
        <button
          type="button"
          className="add-cart-button"
          onClick={handleAdd}
          disabled={stock < 1}
        >
          {stock < 1 ? "Out of stock" : added ? "Added to cart" : "Add to Cart"}
        </button>
        <Link
          to={`/customer/product/${product.category}/${product.id}`}
          className="view-product-button"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
