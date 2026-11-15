
import { useState } from "react";
import { Link } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("farmerProducts") || "[]")
  );

  // Delete product
  function deleteProduct(id) {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "farmerProducts",
      JSON.stringify(updatedProducts)
    );
  }

  return (
    <div className="dashboard-page">

      <h1>📦 My Products</h1>

      <p>Manage the agricultural products added by you.</p>

      <Link
        to="/farmer/add-product"
        className="login-button"
      >
        + Add New Product
      </Link>

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
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  "🌾"
                )}

              </div>

              <h2>{product.name}</h2>

              <p>Category: {product.category}</p>

              <p>Price: ₹{product.price} / {product.unit}</p>

              <p>
                Available: {product.quantity} {product.unit}
              </p>

              <p>Location: {product.location}</p>

              <button
                className="remove-cart-button"
                onClick={() => deleteProduct(product.id)}
              >
                Delete Product
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyProducts;
