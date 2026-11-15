import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import "./pages/farmer/Farmer.css";
import "./pages/customer/Customer.css";
import "./agrimart.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RequireAuth from "./components/RequireAuth";

import FarmerLogin from "./pages/farmer/FarmerLogin";
import FarmerRegister from "./pages/farmer/FarmerRegister";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/MyProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";

import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerHome from "./pages/customer/CustomerHome";
import Categories from "./pages/customer/Categories";
import CategoryProducts from "./pages/customer/CategoryProducts";
import ProductDetails from "./pages/customer/ProductDetails";
import Shop from "./pages/customer/Shop";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import MyOrders from "./pages/customer/MyOrders";
import OrderConfirmation from "./pages/customer/OrderConfirmation";

function NotFound() {
  return (
    <section className="page-shell">
      <h1>This page is not on AgriMart</h1>
      <p>The link may be old. Head back to the home page or the shop.</p>
      <div className="hero-buttons">
        <Link to="/" className="primary-btn">Home</Link>
        <Link to="/customer/shop" className="secondary-btn">Shop</Link>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route
          path="/farmer/dashboard"
          element={<RequireAuth role="farmer"><FarmerDashboard /></RequireAuth>}
        />
        <Route
          path="/farmer/add-product"
          element={<RequireAuth role="farmer"><AddProduct /></RequireAuth>}
        />
        <Route
          path="/farmer/edit/:id"
          element={<RequireAuth role="farmer"><AddProduct /></RequireAuth>}
        />
        <Route
          path="/farmer/products"
          element={<RequireAuth role="farmer"><MyProducts /></RequireAuth>}
        />
        <Route
          path="/farmer/orders"
          element={<RequireAuth role="farmer"><FarmerOrders /></RequireAuth>}
        />

        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route
          path="/customer/home"
          element={<RequireAuth role="customer"><CustomerHome /></RequireAuth>}
        />
        <Route path="/customer/categories" element={<Categories />} />
        <Route path="/customer/category/:category" element={<CategoryProducts />} />
        <Route path="/customer/product/:category/:id" element={<ProductDetails />} />
        <Route path="/customer/shop" element={<Shop />} />
        <Route
          path="/customer/cart"
          element={<RequireAuth role="customer"><Cart /></RequireAuth>}
        />
        <Route
          path="/customer/checkout"
          element={<RequireAuth role="customer"><Checkout /></RequireAuth>}
        />
        <Route
          path="/customer/orders"
          element={<RequireAuth role="customer"><MyOrders /></RequireAuth>}
        />
        <Route
          path="/customer/order-confirmation/:id"
          element={<RequireAuth role="customer"><OrderConfirmation /></RequireAuth>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
