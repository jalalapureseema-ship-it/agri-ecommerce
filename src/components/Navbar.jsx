import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { getSession, logout } from "../utils/storage";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const session = getSession();

  function close() {
    setOpen(false);
  }

  function handleLogout() {
    logout();
    close();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={close}>
        🌾 AgriMart
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <a href="/#categories" onClick={close}>Categories</a>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
        <NavLink to="/customer/shop" onClick={close}>Shop</NavLink>
        {session && (
          <button type="button" className="nav-text-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {session ? (
        <Link
          to={session.role === "farmer" ? "/farmer/dashboard" : "/customer/home"}
          className="nav-login"
          onClick={close}
        >
          Dashboard
        </Link>
      ) : (
        <Link to="/customer/login" className="nav-login" onClick={close}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
