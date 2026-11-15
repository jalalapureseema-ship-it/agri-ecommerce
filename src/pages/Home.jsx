import { Link } from "react-router-dom";
import { FaHandshake, FaLeaf, FaRupeeSign, FaTractor } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import { categories } from "../data/catalog";
import { getAllProducts } from "../utils/storage";

function Home() {
  const featured = categories
    .map((category) =>
      getAllProducts().find((product) => product.category === category.id)
    )
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="small-title">🌱 FARM FRESH • DIRECT FROM FARMERS</p>
          <h1>
            Connecting Farmers
            <br />
            <span>Directly with Customers</span>
          </h1>
          <p className="hero-text">
            AgriMart is a marketplace where growers list seeds, crops,
            produce and tools, and families buy them without a chain of
            middlemen.
          </p>
          <div className="hero-buttons">
            <Link to="/customer/shop" className="primary-btn">🛒 Shop Now</Link>
            <Link to="/farmer/register" className="secondary-btn">👨‍🌾 Sell Your Products</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="farm-circle">🌾</div>
        </div>
      </section>

      <section className="user-section">
        <h2>Who Are You?</h2>
        <p className="section-description">Choose how you want to use AgriMart</p>
        <div className="user-cards">
          <div className="user-card farmer-card">
            <div className="user-icon">👨‍🌾</div>
            <h3>I&apos;m a Farmer</h3>
            <p>Sell your crops and agricultural products directly to customers.</p>
            <Link to="/farmer/login">Farmer Login →</Link>
            <Link to="/farmer/register" className="outline-btn">Create Farmer Account</Link>
          </div>
          <div className="user-card customer-card">
            <div className="user-icon">🛒</div>
            <h3>I&apos;m a Customer</h3>
            <p>Discover fresh crops, fruits and vegetables directly from farmers.</p>
            <Link to="/customer/login">Customer Login →</Link>
            <Link to="/customer/register" className="outline-btn">Create Customer Account</Link>
          </div>
        </div>
      </section>

      <section className="categories-section" id="categories">
        <h2>Explore Categories</h2>
        <p className="section-description">Each category lists only its own products</p>
        <div className="category-container">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/customer/category/${category.id}`}
              className="category-card"
            >
              <div>{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured agricultural products</h2>
        <p className="section-description">A sample from farms already listed on AgriMart</p>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="features-section" id="about">
        <h2>Why Choose AgriMart?</h2>
        <div className="features-container">
          <div className="feature">
            <div><FaTractor /></div>
            <h3>Direct From Farmers</h3>
            <p>Buyers and growers meet on the same listing, with the farmer named on every product.</p>
          </div>
          <div className="feature">
            <div><FaLeaf /></div>
            <h3>Fresh Products</h3>
            <p>Grains, fruit, vegetables, seeds and inputs stay in separate categories.</p>
          </div>
          <div className="feature">
            <div><FaRupeeSign /></div>
            <h3>Fair Prices</h3>
            <p>Farmers set the price. Customers see the total before they confirm an order.</p>
          </div>
          <div className="feature">
            <div><FaHandshake /></div>
            <h3>Support Farmers</h3>
            <p>Payment details and delivery notes go to the grower with the order.</p>
          </div>
        </div>
        <Link to="/about" className="text-link">Read more about AgriMart</Link>
      </section>

      <section className="home-about-section">
        <div>
          <p className="small-title">ABOUT AGRIMART</p>
          <h2>A shorter journey from the field to your table</h2>
        </div>
        <div>
          <p>
            AgriMart helps growers list what they harvest and make, while
            customers discover products by category and order directly.
            Clear listings and farmer-managed stock make buying and selling
            easier to follow.
          </p>
          <Link to="/about" className="text-link">Our story and how it works →</Link>
        </div>
      </section>

      <section className="contact-section">
        <div>
          <h2>Contact</h2>
          <p className="section-description">
            Questions about selling or buying stay on this device until a
            mail service is connected.
          </p>
          <p>Messages are saved in this browser. No support mailbox is connected yet.</p>
        </div>
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
