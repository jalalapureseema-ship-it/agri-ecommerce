import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import ProductCard from "../../components/ProductCard";
import { categoryById } from "../../data/catalog";
import { filterProducts, getProductsByCategory, sortProducts } from "../../utils/storage";

function CategoryProducts() {
  const { category } = useParams();
  const info = categoryById(category);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const products = useMemo(
    () => sortProducts(filterProducts(getProductsByCategory(category), query), sort),
    [category, query, sort]
  );

  if (!info) {
    return (
      <div className="customer-page">
        <CustomerNav />
        <section className="customer-section">
          <h1 className="page-title">Category not found</h1>
          <p>Choose a category from the shop.</p>
          <Link to="/customer/categories" className="shop-button">Back to categories</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        <h1 className="page-title">{info.icon} {info.name}</h1>
        <p className="page-description">
          Only {info.name.toLowerCase()} are listed here. {info.description}.
        </p>

        <form className="shop-toolbar" onSubmit={(event) => event.preventDefault()}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${info.name.toLowerCase()}`}
            aria-label="Search products in this category"
          />
          <select value={sort} aria-label="Sort products" onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </form>

        {products.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🔍</div>
            <h2>No products found</h2>
            <p>Nothing in {info.name.toLowerCase()} matches that search.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CategoryProducts;
