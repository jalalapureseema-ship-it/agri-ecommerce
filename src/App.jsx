import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS
import "./pages/farmer/Farmer.css";
import "./pages/customer/Customer.css";

// Home
import Home from "./pages/Home";

// ================= FARMER PAGES =================

import FarmerLogin from "./pages/farmer/FarmerLogin";
import FarmerRegister from "./pages/farmer/FarmerRegister";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/Myproducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";

// ================= CUSTOMER PAGES =================

import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerHome from "./pages/customer/CustomerHome";
import Categories from "./pages/customer/Categories";
import CategoryProducts from "./pages/customer/CategoryProducts";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import MyOrders from "./pages/customer/MyOrders";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= FARMER ================= */}

        <Route
          path="/farmer/login"
          element={<FarmerLogin />}
        />

        <Route
          path="/farmer/register"
          element={<FarmerRegister />}
        />

        <Route
          path="/farmer/dashboard"
          element={<FarmerDashboard />}
        />

        <Route
          path="/farmer/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/farmer/products"
          element={<MyProducts />}
        />

        <Route
          path="/farmer/orders"
          element={<FarmerOrders />}
        />


        {/* ================= CUSTOMER ================= */}

        <Route
          path="/customer/login"
          element={<CustomerLogin />}
        />

        <Route
          path="/customer/register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer/home"
          element={<CustomerHome />}
        />

        <Route
          path="/customer/categories"
          element={<Categories />}
        />

        <Route
          path="/customer/category/:category"
          element={<CategoryProducts />}
        />

        <Route
          path="/customer/product/:category/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/customer/cart"
          element={<Cart />}
        />

        <Route
          path="/customer/checkout"
          element={<Checkout />}
        />

        <Route
          path="/customer/orders"
          element={<MyOrders />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;