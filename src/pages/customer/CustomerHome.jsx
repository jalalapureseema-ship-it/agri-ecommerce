import { Link } from "react-router-dom";

function CustomerHome() {
  return (
    <div className="customer-home">

      {/* ================= NAVBAR ================= */}
      <nav className="customer-navbar">
        <div className="customer-logo">
          🌾 AgriMart
        </div>

        <div className="customer-nav-links">
          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/cart">🛒 Cart</Link>
          <Link to="/customer/orders">My Orders</Link>
        </div>

        <Link to="/" className="customer-logout">
          Logout
        </Link>
      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="customer-hero">

        <div className="customer-hero-content">
          <p className="hero-small-text">
            🌱 Welcome to AgriMart
          </p>

          <h1>
            Fresh Products,
            <br />
            Directly From Farmers
          </h1>

          <p>
            Buy fresh and quality agricultural products
            directly from local farmers at fair prices.
          </p>

          <div className="hero-buttons">
            <Link
              to="/customer/categories"
              className="shop-button"
            >
              Shop Now 🛒
            </Link>

            <Link
              to="/customer/categories"
              className="explore-button"
            >
              Explore Products
            </Link>
          </div>
        </div>

        <div className="customer-hero-icon">
          🌾
          <div>
            🍎 🥕 🌽
          </div>
        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="customer-section">

        <h2>Shop by Category</h2>

        <p className="page-description">
          Explore fresh products available from our farmers.
        </p>

        <div className="category-cards">

          <Link
            to="/customer/category/crops"
            className="category-card"
          >
            <div className="category-icon">🌾</div>
            <h3>Crops</h3>
            <p>Rice, wheat, maize and other crops</p>
            <span className="view-products">
              View Products →
            </span>
          </Link>


          <Link
            to="/customer/category/fruits"
            className="category-card"
          >
            <div className="category-icon">🍎</div>
            <h3>Fruits</h3>
            <p>Fresh fruits directly from farmers</p>
            <span className="view-products">
              View Products →
            </span>
          </Link>


          <Link
            to="/customer/category/vegetables"
            className="category-card"
          >
            <div className="category-icon">🥕</div>
            <h3>Vegetables</h3>
            <p>Fresh farm vegetables</p>
            <span className="view-products">
              View Products →
            </span>
          </Link>


          <Link
            to="/customer/category/seeds"
            className="category-card"
          >
            <div className="category-icon">🌱</div>
            <h3>Seeds</h3>
            <p>Quality seeds for farming</p>
            <span className="view-products">
              View Products →
            </span>
          </Link>


          <Link
            to="/customer/category/pesticides"
            className="category-card"
          >
            <div className="category-icon">🧪</div>
            <h3>Pesticides</h3>
            <p>Products for crop protection</p>
            <span className="view-products">
              View Products →
            </span>
          </Link>

        </div>
      </section>


      {/* ================= WHY AGRIMART ================= */}
      <section className="customer-section why-section">

        <h2>Why Choose AgriMart?</h2>

        <p className="page-description">
          Making agricultural shopping simple and convenient.
        </p>

        <div className="why-cards">

          <div className="why-card">
            <div className="why-icon">👨‍🌾</div>
            <h3>Direct From Farmers</h3>
            <p>
              Buy products directly from farmers without
              unnecessary middlemen.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">🌱</div>
            <h3>Fresh Products</h3>
            <p>
              Get fresh and quality agricultural products
              from local sellers.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Fair Prices</h3>
            <p>
              Farmers can sell at better prices and customers
              can buy at reasonable prices.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>Easy Shopping</h3>
            <p>
              Browse products, add them to your cart and
              place your order easily.
            </p>
          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="customer-section">

        <h2>How AgriMart Works</h2>

        <div className="steps-container">

          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose Products</h3>
            <p>
              Browse different agricultural products
              from our categories.
            </p>
          </div>


          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Add to Cart</h3>
            <p>
              Select the quantity you need and add
              products to your cart.
            </p>
          </div>


          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Place Order</h3>
            <p>
              Complete checkout and place your order
              easily.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="customer-footer">

        <div>
          <h2>🌾 AgriMart</h2>
          <p>
            Connecting farmers and customers through
            simple online shopping.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/customer/home">Home</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/cart">Cart</Link>
          <Link to="/customer/orders">My Orders</Link>
        </div>

      </footer>

    </div>
  );
}

export default CustomerHome;