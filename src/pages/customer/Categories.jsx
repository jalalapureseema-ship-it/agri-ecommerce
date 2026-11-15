import { Link } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import { categories } from "../../data/catalog";

function Categories() {
  return (
    <div className="customer-page">
      <CustomerNav />

      <section className="customer-section">
        <h1 className="page-title">Product Categories</h1>
        <p className="page-description">
          Choose a category. Only products from that category are shown.
        </p>

        <div className="category-cards">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/customer/category/${category.id}`}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <span className="view-products">View Products →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Categories;
