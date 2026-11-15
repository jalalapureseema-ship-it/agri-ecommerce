
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Product information
  const products = {
    crops: [
      {
        name: "Fresh Rice",
        price: 60,
        unit: "Kg",
        icon: "🌾",
        farmer: "Local Farmer",
        available: 500,
        location: "Raibag",
        description: "Fresh quality rice directly from the farmer.",
      },
      {
        name: "Wheat",
        price: 45,
        unit: "Kg",
        icon: "🌾",
        farmer: "Ramesh",
        available: 300,
        location: "Belagavi",
        description: "Good-quality wheat for daily use.",
      },
      {
        name: "Maize",
        price: 30,
        unit: "Kg",
        icon: "🌽",
        farmer: "Suresh",
        available: 400,
        location: "Raibag",
        description: "Fresh maize supplied by the farmer.",
      },
    ],

    fruits: [
      {
        name: "Fresh Apples",
        price: 120,
        unit: "Kg",
        icon: "🍎",
        farmer: "Local Farmer",
        available: 100,
        location: "Himachal Pradesh",
        description: "Fresh apples for your family.",
      },
      {
        name: "Banana",
        price: 50,
        unit: "Dozen",
        icon: "🍌",
        farmer: "Ravi",
        available: 200,
        location: "Belagavi",
        description: "Fresh bananas supplied by the farmer.",
      },
      {
        name: "Mango",
        price: 100,
        unit: "Kg",
        icon: "🥭",
        farmer: "Kiran",
        available: 150,
        location: "Raibag",
        description: "Fresh seasonal mangoes.",
      },
    ],

    vegetables: [
      {
        name: "Tomato",
        price: 40,
        unit: "Kg",
        icon: "🍅",
        farmer: "Local Farmer",
        available: 200,
        location: "Raibag",
        description: "Fresh farm-grown tomatoes.",
      },
      {
        name: "Potato",
        price: 35,
        unit: "Kg",
        icon: "🥔",
        farmer: "Mahesh",
        available: 300,
        location: "Belagavi",
        description: "Fresh potatoes directly from the farm.",
      },
      {
        name: "Carrot",
        price: 50,
        unit: "Kg",
        icon: "🥕",
        farmer: "Ravi",
        available: 150,
        location: "Raibag",
        description: "Fresh farm-grown carrots.",
      },
    ],

    seeds: [
      {
        name: "Rice Seeds",
        price: 80,
        unit: "Kg",
        icon: "🌱",
        farmer: "Local Farmer",
        available: 100,
        location: "Raibag",
        description: "Rice seeds for cultivation.",
      },
      {
        name: "Wheat Seeds",
        price: 70,
        unit: "Kg",
        icon: "🌱",
        farmer: "Suresh",
        available: 100,
        location: "Belagavi",
        description: "Quality wheat seeds for farming.",
      },
      {
        name: "Maize Seeds",
        price: 90,
        unit: "Kg",
        icon: "🌱",
        farmer: "Ramesh",
        available: 80,
        location: "Raibag",
        description: "Maize seeds for agricultural use.",
      },
      {
        name: "Vegetable Seeds",
        price: 120,
        unit: "Pack",
        icon: "🌱",
        farmer: "Kiran",
        available: 50,
        location: "Belagavi",
        description: "Seeds for growing vegetables.",
      },
    ],

    pesticides: [
      {
        name: "Organic Pesticide",
        price: 250,
        unit: "Bottle",
        icon: "🧪",
        farmer: "Agri Supplier",
        available: 50,
        location: "Belagavi",
        description: "An organic crop-protection product.",
      },
      {
        name: "Crop Protection Spray",
        price: 350,
        unit: "Bottle",
        icon: "🧪",
        farmer: "Agri Supplier",
        available: 40,
        location: "Raibag",
        description: "A product intended for crop protection.",
      },
      {
        name: "Organic Crop Protector",
        price: 300,
        unit: "Bottle",
        icon: "🧪",
        farmer: "Local Supplier",
        available: 30,
        location: "Belagavi",
        description: "A crop-protection product.",
      },
    ],
  };

  const categoryNames = {
    crops: "Crops",
    fruits: "Fruits",
    vegetables: "Vegetables",
    seeds: "Seeds",
    pesticides: "Pesticides",
  };

  // Find the selected product
  // Get farmer-added products
const farmerProducts =
  JSON.parse(localStorage.getItem("farmerProducts") || "[]");

const categoryFarmerProducts = farmerProducts
  .filter((item) => item.category === category);

// Get sample products
const sampleProducts = products[category] || [];

// Find the selected product
let product;

if (Number(id) < sampleProducts.length) {
  product = sampleProducts[Number(id)];
} else {
  const farmerProduct =
    categoryFarmerProducts[Number(id) - sampleProducts.length];

  if (farmerProduct) {
    product = {
      ...farmerProduct,
      available: Number(farmerProduct.quantity),
      icon: "🌾",
      farmer: "Registered Farmer",
    };
  }
}

  // Handle invalid product URL
  if (!product) {
    return (
      <div className="customer-page">
        <nav className="customer-navbar">
          <div className="customer-logo">🌾 AgriMart</div>
          <Link to="/customer/categories">Categories</Link>
        </nav>

        <section className="customer-section">
          <h1>Product Not Found</h1>
          <p>Please select a product from the category page.</p>
          <Link
            to="/customer/categories"
            className="shop-button"
          >
            Back to Categories
          </Link>
        </section>
      </div>
    );
  }

  // Add selected product to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingIndex = cart.findIndex(
      (item) =>
        item.name === product.name &&
        item.unit === product.unit
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      const cartItem = {
  id: `${category}-${id}`,
  category,
  name: product.name,
  price: product.price,
  unit: product.unit,
  icon: product.icon,
  image: product.image || "",
  farmer: product.farmer,
  quantity,
};

      updatedCart = [...cart, cartItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.name} added to cart successfully!`);
    navigate("/customer/cart");
  };

  return (
    <div className="customer-page">
      {/* Navigation */}
      <nav className="customer-navbar">
        <div className="customer-logo">🌾 AgriMart</div>

        <div className="customer-nav-links">
          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/cart">🛒 Cart</Link>
          <Link to="/customer/orders">My Orders</Link>
        </div>
      </nav>

      {/* Product details */}
      <section className="product-details">
        <div className="product-image">
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

        <div className="product-information">
          <span className="product-category">
            {categoryNames[category]}
          </span>

          <h1>{product.name}</h1>

          <p className="product-price">
            ₹{product.price} / {product.unit}
          </p>

          <p>{product.description}</p>

          <p>
            <strong>Available Quantity:</strong>{" "}
            {product.available} {product.unit}
          </p>

          <p>
            <strong>Location:</strong> {product.location}
          </p>

          <p>
            <strong>Seller:</strong> {product.farmer}
          </p>

          {/* Quantity selector */}
          <div className="quantity-box">
            <label htmlFor="product-quantity">
              Quantity ({product.unit})
            </label>

            <input
              id="product-quantity"
              type="number"
              min="1"
              max={product.available}
              value={quantity}
              onChange={(e) => {
                const value = Number(e.target.value);

                setQuantity(
                  value > product.available
                    ? product.available
                    : value
                );
              }}
            />
          </div>

          <p className="product-price">
            Total: ₹{product.price * quantity}
          </p>

          {/* Action buttons */}
          <div className="product-buttons">
            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
              disabled={
                quantity < 1 ||
                quantity > product.available
              }
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/customer/categories"
              className="buy-now-button"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;