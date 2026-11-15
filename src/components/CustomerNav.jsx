import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { getCart, getSession, logout } from "../utils/storage";

function CustomerNav() {
  const navigate = useNavigate();
  const session = getSession();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(() =>
    getCart().reduce((sum, item) => sum + Number(item.quantity), 0)
  );

  useEffect(() => {
    function refresh() {
      setCount(getCart().reduce((sum, item) => sum + Number(item.quantity), 0));
    }
    window.addEventListener("agrimart-storage", refresh);
    return () => window.removeEventListener("agrimart-storage", refresh);
  }, []);

  function close() {
    setOpen(false);
  }

  function search(event) {
    event.preventDefault();
    navigate(`/customer/shop?q=${encodeURIComponent(query.trim())}`);
    close();
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="customer-navbar">
      <Link to="/customer/home" className="customer-logo" onClick={close}>
        🌾 AgriMart
      </Link>

      <form className="nav-search" onSubmit={search}>
        <FaSearch aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
        />
      </form>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`customer-nav-links ${open ? "open" : ""}`}>
        <Link to="/customer/home" onClick={close}>Home</Link>
        <Link to="/customer/shop" onClick={close}>Shop</Link>
        <Link to="/customer/categories" onClick={close}>Categories</Link>
        <Link to="/customer/cart" onClick={close}>Cart ({count})</Link>
        <Link to="/customer/orders" onClick={close}>My Orders</Link>
      </div>

      {session?.role === "customer" ? (
        <button type="button" className="customer-logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/customer/login" className="customer-logout" onClick={close}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default CustomerNav;
