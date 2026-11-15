import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomerNav from "../../components/CustomerNav";
import ProductCard from "../../components/ProductCard";
import { categories } from "../../data/catalog";
import { filterProducts, getAllProducts, getProductsByCategory, sortProducts } from "../../utils/storage";

function Shop() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "all";
  const sort = params.get("sort") || "featured";
  const [draft, setDraft] = useState(query);

  const products = useMemo(() => {
    const source = category === "all" ? getAllProducts() : getProductsByCategory(category);
    return sortProducts(filterProducts(source, query), sort);
  }, [category, query, sort]);

  function update(next) {
    const merged = { q: query, category, sort, ...next };
    const cleaned = {};
    if (merged.q) cleaned.q = merged.q;
    if (merged.category && merged.category !== "all") cleaned.category = merged.category;
    if (merged.sort && merged.sort !== "featured") cleaned.sort = merged.sort;
    setParams(cleaned);
  }

  function search(event) {
    event.preventDefault();
    update({ q: draft.trim() });
  }

  return (
    <div className="customer-page">
      <CustomerNav />
      <section className="customer-section">
        <h1 className="page-title">Shop agricultural products</h1>
        <p className="page-description">
          Search by name, choose a category, and sort by price.
        </p>

        <form className="shop-toolbar" onSubmit={search}>
          <input
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search by product name"
            aria-label="Search by product name"
          />
          <select
            value={category}
            aria-label="Filter by category"
            onChange={(event) => update({ category: event.target.value })}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          <select
            value={sort}
            aria-label="Sort products"
            onChange={(event) => update({ sort: event.target.value })}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
          <button type="submit" className="shop-button">Search</button>
        </form>

        {products.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🔍</div>
            <h2>No products found</h2>
            <p>Try another name or choose a different category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={`${product.category}-${product.id}`} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
