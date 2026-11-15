import { Link, useNavigate } from "react-router-dom";
import { getSession, logout } from "../utils/storage";

function FarmerNav() {
  const navigate = useNavigate();
  const session = getSession();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="customer-navbar farmer-topnav">
      <Link to="/farmer/dashboard" className="customer-logo">
        🌾 AgriMart
      </Link>
      <div className="customer-nav-links">
        <Link to="/farmer/dashboard">Dashboard</Link>
        <Link to="/farmer/add-product">Add Product</Link>
        <Link to="/farmer/products">My Products</Link>
        <Link to="/farmer/orders">Orders</Link>
      </div>
      <button type="button" className="customer-logout" onClick={handleLogout}>
        {session?.name ? `${session.name} · Logout` : "Logout"}
      </button>
    </nav>
  );
}

export default FarmerNav;
