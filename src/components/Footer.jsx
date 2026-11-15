import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <h2>🌾 AgriMart</h2>
          <p>Connecting farmers directly with customers.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/customer/shop">Shop</Link>
        </div>

        <div>
          <h3>Accounts</h3>
          <Link to="/farmer/login">Farmer login</Link>
          <Link to="/farmer/register">Farmer registration</Link>
          <Link to="/customer/login">Customer login</Link>
          <Link to="/customer/register">Customer registration</Link>
        </div>
      </div>

      <p className="copyright">© 2026 AgriMart. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
