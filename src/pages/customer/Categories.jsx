import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Crops",
      icon: "🌾",
      id: "crops",
      description: "Rice, wheat, maize and other crops",
    },
    {
      name: "Fruits",
      icon: "🍎",
      id: "fruits",
      description: "Fresh fruits directly from farmers",
    },
    {
      name: "Vegetables",
      icon: "🥕",
      id: "vegetables",
      description: "Fresh farm vegetables",
    },
    {
      name: "Seeds",
      icon: "🌱",
      id: "seeds",
      description: "Quality seeds for farming",
    },
    {
      name: "Pesticides",
      icon: "🧪",
      id: "pesticides",
      description: "Crop protection products",
    },
  ];

  return (
    <div className="customer-page">

      {/* Navbar */}
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

      </nav>

      {/* Categories */}
      <section className="customer-section">

        <h1 className="page-title">
          Product Categories
        </h1>

        <p className="page-description">
          Choose a category to explore products.
        </p>

        <div className="category-cards">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/customer/category/${category.id}`}
              className="category-card"
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h2>{category.name}</h2>

              <p>{category.description}</p>

              <span className="view-products">
                View Products →
              </span>
            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Categories;