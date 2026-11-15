import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/storage";

const empty = {
  name: "",
  mobile: "",
  email: "",
  village: "",
  district: "",
  password: "",
  confirm: "",
};

function FarmerRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(empty);
  const [notice, setNotice] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = registerUser("farmer", form);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/farmer/dashboard", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-box register-box">
        <div className="login-logo">👨‍🌾</div>
        <h1>Farmer Registration</h1>
        <p>Create your AgriMart farmer account</p>
        {notice && <p className="form-error" role="status">{notice}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="farmer-name">Full Name</label>
          <input id="farmer-name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />

          <label htmlFor="farmer-reg-mobile">Mobile Number</label>
          <input id="farmer-reg-mobile" name="mobile" value={form.mobile} onChange={handleChange} type="tel" placeholder="Enter mobile number" required />

          <label htmlFor="farmer-reg-email">Email</label>
          <input id="farmer-reg-email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter email" required />

          <label htmlFor="farmer-village">Village</label>
          <input id="farmer-village" name="village" value={form.village} onChange={handleChange} placeholder="Enter your village" required />

          <label htmlFor="farmer-district">District</label>
          <input id="farmer-district" name="district" value={form.district} onChange={handleChange} placeholder="Enter your district" required />

          <label htmlFor="farmer-reg-password">Password</label>
          <input id="farmer-reg-password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Create password" required />

          <label htmlFor="farmer-reg-confirm">Confirm Password</label>
          <input id="farmer-reg-confirm" name="confirm" value={form.confirm} onChange={handleChange} type="password" placeholder="Confirm password" required />

          <button type="submit" className="login-button">Create Farmer Account</button>
        </form>

        <p className="register-text">
          Already have an account? <Link to="/farmer/login" state={location.state}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default FarmerRegister;
