import { useState } from "react";
import { Link } from "react-router-dom";
import FarmerNav from "../../components/FarmerNav";
import { categoryName } from "../../data/catalog";
import { deleteFarmerProduct, getSession, ownProducts } from "../../utils/storage";

function MyProducts() {
  const session = getSession();
  const [products, setProducts] = useState(() => ownProducts(session?.email || ""));

  function deleteProduct(id) {
    const remaining = deleteFarmerProduct(id).filter(
      (product) => !product.farmerEmail || product.farmerEmail === session?.email
    );
    setProducts(remaining);
  }

  return (
    <div className="dashboard-page">
      <FarmerNav />
      <h1>📦 My Products</h1>
      <p>Manage the agricultural products added by you.</p>
      <Link to="/farmer/add-product" className="login-button">+ Add New Product</Link>

      {products.length === 0 ? (
        <div className="empty-products">
          <div>📦</div>
          <h2>No Products Yet</h2>
          <p>Start selling by adding your first product.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  product.icon || "🌾"
                )}
              </div>
              <h2>{product.name}</h2>
              <p>Category: {categoryName(product.category)}</p>
              <p>Price: ₹{product.price} / {product.unit}</p>
              <p>Available: {product.quantity} {product.unit}</p>
              <p>Location: {product.location}</p>
              <div className="card-actions">
                <Link to={`/farmer/edit/${product.id}`} className="view-product-button">
                  Edit
                </Link>
                <button type="button" className="remove-cart-button" onClick={() => deleteProduct(product.id)}>
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
