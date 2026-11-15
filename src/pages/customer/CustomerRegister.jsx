import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/storage";

const empty = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  password: "",
  confirm: "",
};

function CustomerRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(empty);
  const [notice, setNotice] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = registerUser("customer", form);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/customer/home", { replace: true });
  }

  return (
    <div className="customer-login-page">
      <div className="customer-login-box customer-register-box">
        <div className="customer-login-logo">🛒</div>
        <h1>Create Account</h1>
        <p>Join AgriMart as a customer</p>
        {notice && <p className="form-error" role="status">{notice}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="cust-name">Full Name</label>
          <input id="cust-name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />

          <label htmlFor="cust-mobile">Mobile Number</label>
          <input id="cust-mobile" name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="Enter mobile number" required />

          <label htmlFor="cust-email">Email</label>
          <input id="cust-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />

          <label htmlFor="cust-address">Address</label>
          <textarea id="cust-address" name="address" value={form.address} onChange={handleChange} placeholder="Enter your address" rows="3" required />

          <label htmlFor="cust-password">Password</label>
          <input id="cust-password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create password" required />

          <label htmlFor="cust-confirm">Confirm Password</label>
          <input id="cust-confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Confirm password" required />

          <button type="submit" className="customer-login-button">Create Account</button>
        </form>

        <p className="customer-register-text">
          Already have an account? <Link to="/customer/login" state={location.state}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerRegister;
