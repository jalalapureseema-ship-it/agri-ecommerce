import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="home-page">
      <Navbar />
      <section className="page-shell">
        <p className="small-title">ABOUT AGRIMART</p>
        <h1>A direct path from the field to the kitchen</h1>
        <p>
          AgriMart exists so farmers can sell what they grow, and customers
          can buy it without handing the margin to a long chain of traders.
          A farmer publishes a product with a photo, price, quantity and
          location. A customer searches that catalogue, filters by category,
          and places an order with a delivery address.
        </p>
        <div className="about-grid">
          <article>
            <h2>For farmers</h2>
            <p>
              Registration opens a dashboard for new listings, edits, stock
              updates and the orders that contain those listings. Status can
              move from placed to delivered as the produce leaves the farm.
            </p>
          </article>
          <article>
            <h2>For customers</h2>
            <p>
              Seeds, fertilizers, pesticides, crops, fruits, vegetables and
              equipment each keep their own products. The cart remembers
              quantities in this browser, and past orders stay available to review.
            </p>
          </article>
          <article>
            <h2>Why direct selling helps</h2>
            <p>
              Growers keep more of the price they set. Buyers see who grew
              the food and how much is still in stock. Fewer handoffs mean
              fresher produce and a clearer story for every purchase.
            </p>
          </article>
        </div>
        <div className="hero-buttons">
          <Link to="/farmer/register" className="primary-btn">Start selling</Link>
          <Link to="/customer/shop" className="secondary-btn">Browse products</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
