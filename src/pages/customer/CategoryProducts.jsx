
import { Link, useParams } from "react-router-dom";

function CategoryProducts() {
  const { category } = useParams();

  // Sample products
  const products = {
    crops: [
      { name: "Fresh Rice", price: 60, unit: "Kg", icon: "🌾", farmer: "Local Farmer" },
      { name: "Wheat", price: 45, unit: "Kg", icon: "🌾", farmer: "Ramesh" },
      { name: "Maize", price: 30, unit: "Kg", icon: "🌽", farmer: "Suresh" },
    ],

    fruits: [
      { name: "Fresh Apples", price: 120, unit: "Kg", icon: "🍎", farmer: "Local Farmer" },
      { name: "Banana", price: 50, unit: "Dozen", icon: "🍌", farmer: "Ravi" },
      { name: "Mango", price: 100, unit: "Kg", icon: "🥭", farmer: "Kiran" },
    ],

    vegetables: [
      { name: "Tomato", price: 40, unit: "Kg", icon: "🍅", farmer: "Local Farmer" },
      { name: "Potato", price: 35, unit: "Kg", icon: "🥔", farmer: "Mahesh" },
      { name: "Carrot", price: 50, unit: "Kg", icon: "🥕", farmer: "Ravi" },
    ],

    seeds: [
      { name: "Rice Seeds", price: 80, unit: "Kg", icon: "🌱", farmer: "Local Farmer" },
      { name: "Wheat Seeds", price: 70, unit: "Kg", icon: "🌱", farmer: "Suresh" },
      { name: "Maize Seeds", price: 90, unit: "Kg", icon: "🌱", farmer: "Ramesh" },
      { name: "Vegetable Seeds", price: 120, unit: "Pack", icon: "🌱", farmer: "Kiran" },
    ],

    pesticides: [
      { name: "Organic Pesticide", price: 250, unit: "Bottle", icon: "🧪", farmer: "Agri Supplier" },
      { name: "Crop Protection Spray", price: 350, unit: "Bottle", icon: "🧪", farmer: "Agri Supplier" },
      { name: "Organic Crop Protector", price: 300, unit: "Bottle", icon: "🧪", farmer: "Local Supplier" },
    ],
  };

  // Get farmer-added products from localStorage
  const farmerProducts =
    JSON.parse(localStorage.getItem("farmerProducts")) || [];

  // Combine sample products and farmer products
  const categoryProducts = [
    ...(products[category] || []),
    ...farmerProducts
      .filter((item) => item.category === category)
      .map((item) => ({
        ...item,
        icon: "🌾",
        farmer: item.farmer || "Registered Farmer",
      })),
  ];

  const categoryNames = {
    crops: "Crops",
    fruits: "Fruits",
    vegetables: "Vegetables",
    seeds: "Seeds",
    pesticides: "Pesticides",
  };

  const categoryName = categoryNames[category] || "Products";

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

        <h1 className="page-title">{categoryName}</h1>

        <p className="page-description">
          Explore {categoryName.toLowerCase()} available from our farmers.
        </p>

        {categoryProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="product-grid">

            {categoryProducts.map((product, index) => (
              <div className="product-card" key={product.id || index}>

                <div className="product-card-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    product.icon
                  )}
                </div>

                <h2>{product.name}</h2>

                <p className="product-card-price">
                  ₹{product.price} / {product.unit}
                </p>

                <p>👨‍🌾 {product.farmer}</p>

                {product.quantity !== undefined && (
                  <p>Available: {product.quantity} {product.unit}</p>
                )}

                <Link
                  to={`/customer/product/${category}/${index}`}
                  className="view-product-button"
                >
                  View Product
                </Link>

              </div>
            ))}

          </div>
        )}

      </section>
    </div>
  );
}

export default CategoryProducts;
