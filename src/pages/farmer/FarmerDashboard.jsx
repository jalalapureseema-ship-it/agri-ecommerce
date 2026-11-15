import { Link, useNavigate } from "react-router-dom";
import { getFarmerOrders, getSession, logout, ownProducts } from "../../utils/storage";

function FarmerDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const products = ownProducts(session?.email || "");
  const orders = getFarmerOrders(session?.email || "");
  const sales = orders.reduce((sum, order) => {
    const mine = order.items.filter((item) => item.farmerEmail === session?.email);
    return sum + mine.reduce((line, item) => line + item.price * item.quantity, 0);
  }, 0);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🌾 AgriMart</h2>
        <p className="farmer-name">👨‍🌾 {session?.name || "Farmer"}</p>
        <Link to="/farmer/dashboard">🏠 Dashboard</Link>
        <Link to="/farmer/add-product">➕ Add Product</Link>
        <Link to="/farmer/products">📦 My Products</Link>
        <Link to="/farmer/orders">🛒 Orders</Link>
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <h1>Welcome, {session?.name || "Farmer"}! 👨‍🌾</h1>
        <p>Manage your agricultural products and orders.</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div>📦</div>
            <h3>Products</h3>
            <strong>{products.length}</strong>
          </div>
          <div className="dashboard-card">
            <div>🛒</div>
            <h3>Total Orders</h3>
            <strong>{orders.length}</strong>
          </div>
          <div className="dashboard-card">
            <div>💰</div>
            <h3>Total Sales</h3>
            <strong>₹{sales}</strong>
          </div>
          <div className="dashboard-card">
            <div>📍</div>
            <h3>Location</h3>
            <strong>{session?.village || "Farm"}</strong>
          </div>
        </div>

        <h2 className="dashboard-heading">Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/farmer/add-product">
            <div>
              ➕
              <h3>Add Product</h3>
              <p>Add a new agricultural product</p>
            </div>
          </Link>
          <Link to="/farmer/products">
            <div>
              📦
              <h3>My Products</h3>
              <p>View and manage your products</p>
            </div>
          </Link>
          <Link to="/farmer/orders">
            <div>
              🛒
              <h3>Orders</h3>
              <p>Check customer orders</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default FarmerDashboard;
