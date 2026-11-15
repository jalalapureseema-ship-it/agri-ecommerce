function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          🌾 AgriMart
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="nav-login">
          Login
        </button>

      </nav>


      {/* Hero Section */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <p className="small-title">
            🌱 FARM FRESH • DIRECT FROM FARMERS
          </p>

          <h1>
            Fresh Products,
            <br />
            <span>Directly From Farmers</span>
          </h1>

          <p className="hero-text">
            Buy fresh crops, fruits and vegetables directly
            from farmers and support local agriculture.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              🛒 Shop Now
            </button>

            <button className="secondary-btn">
              👨‍🌾 Sell Your Products
            </button>

          </div>

        </div>


        <div className="hero-image">
          <div className="farm-circle">
            🌾
          </div>
        </div>

      </section>


      {/* Farmer / Customer Section */}
      <section className="user-section">

        <h2>Who Are You?</h2>

        <p className="section-description">
          Choose how you want to use AgriMart
        </p>


        <div className="user-cards">

          {/* Farmer */}
          <div className="user-card farmer-card">

            <div className="user-icon">
              👨‍🌾
            </div>

            <h3>I'm a Farmer</h3>

            <p>
              Sell your crops and agricultural products
              directly to customers.
            </p>

            <button>
              Farmer Login →
            </button>

            <button className="outline-btn">
              Create Farmer Account
            </button>

          </div>


          {/* Customer */}
          <div className="user-card customer-card">

            <div className="user-icon">
              🛒
            </div>

            <h3>I'm a Customer</h3>

            <p>
              Discover fresh crops, fruits and vegetables
              directly from farmers.
            </p>

            <button>
              Customer Login →
            </button>

            <button className="outline-btn">
              Create Customer Account
            </button>

          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="categories-section" id="categories">

        <h2>Explore Categories</h2>

        <p className="section-description">
          Fresh products from local farmers
        </p>


        <div className="category-container">

          <div className="category-card">
            <div>🌾</div>
            <h3>Crops</h3>
            <p>Fresh farm crops</p>
          </div>

          <div className="category-card">
            <div>🍎</div>
            <h3>Fruits</h3>
            <p>Fresh seasonal fruits</p>
          </div>

          <div className="category-card">
            <div>🥕</div>
            <h3>Vegetables</h3>
            <p>Healthy vegetables</p>
          </div>

          <div className="category-card">
            <div>🌱</div>
            <h3>Seeds</h3>
            <p>Quality farming seeds</p>
          </div>

        </div>

      </section>


      {/* Features */}
      <section className="features-section" id="about">

        <h2>Why Choose AgriMart?</h2>

        <div className="features-container">

          <div className="feature">
            <div>🚜</div>
            <h3>Direct From Farmers</h3>
            <p>
              Connect directly with farmers and buy
              fresh agricultural products.
            </p>
          </div>


          <div className="feature">
            <div>🥬</div>
            <h3>Fresh Products</h3>
            <p>
              Get fresh and quality farm products
              directly from their source.
            </p>
          </div>


          <div className="feature">
            <div>💰</div>
            <h3>Fair Prices</h3>
            <p>
              Farmers receive better prices while
              customers get reasonable prices.
            </p>
          </div>


          <div className="feature">
            <div>🤝</div>
            <h3>Support Farmers</h3>
            <p>
              Your purchase helps support local farmers
              and agriculture.
            </p>
          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="footer" id="contact">

        <h2>🌾 AgriMart</h2>

        <p>
          Connecting Farmers with Customers
        </p>

        <p className="copyright">
          © 2026 AgriMart. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;
