import { Link } from "react-router-dom";

function FarmerDashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>🌾 AgriMart</h2>

        <p className="farmer-name">
          👨‍🌾 Farmer
        </p>

        <Link to="/farmer/dashboard">
          🏠 Dashboard
        </Link>

        <Link to="/farmer/add-product">
          ➕ Add Product
        </Link>

        <Link to="/farmer/products">
          📦 My Products
        </Link>

        <Link to="/farmer/orders">
          🛒 Orders
        </Link>

        <Link to="/">
          🚪 Logout
        </Link>

      </aside>


      {/* Main Content */}
      <main className="dashboard-content">

        <h1>Welcome, Farmer! 👨‍🌾</h1>

        <p>
          Manage your agricultural products and orders.
        </p>


        {/* Statistics */}
        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div>📦</div>
            <h3>Products</h3>
            <strong>0</strong>
          </div>

          <div className="dashboard-card">
            <div>🛒</div>
            <h3>Total Orders</h3>
            <strong>0</strong>
          </div>

          <div className="dashboard-card">
            <div>💰</div>
            <h3>Total Sales</h3>
            <strong>₹0</strong>
          </div>

          <div className="dashboard-card">
            <div>⭐</div>
            <h3>Rating</h3>
            <strong>0.0</strong>
          </div>

        </div>


        {/* Quick Actions */}
        <h2 className="dashboard-heading">
          Quick Actions
        </h2>

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