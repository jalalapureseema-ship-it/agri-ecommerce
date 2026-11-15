import { useState } from "react";

function CustomerLogin() {
  const [loginType, setLoginType] = useState("email");

  return (
    <div className="customer-login-page">

      <div className="customer-login-box">

        {/* Logo */}
        <div className="customer-login-logo">
          🛒
        </div>

        <h1>Customer Login</h1>

        <p>Welcome back to AgriMart!</p>


        {/* Login Type */}
        <div className="customer-login-options">

          <button
            className={
              loginType === "email"
                ? "customer-active-option"
                : ""
            }
            onClick={() => setLoginType("email")}
          >
            📧 Email Login
          </button>

          <button
            className={
              loginType === "mobile"
                ? "customer-active-option"
                : ""
            }
            onClick={() => setLoginType("mobile")}
          >
            📱 Mobile Login
          </button>

        </div>


        {/* Email Login */}
        {loginType === "email" && (

          <form>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="customer-login-button"
            >
              Login
            </button>

            <a
              href="#"
              className="customer-forgot-password"
            >
              Forgot Password?
            </a>

          </form>

        )}


        {/* Mobile Login */}
        {loginType === "mobile" && (

          <form>

            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter mobile number"
            />

            <button
              type="button"
              className="customer-login-button"
            >
              Send OTP
            </button>

            <label>OTP</label>

            <input
              type="text"
              placeholder="Enter OTP"
            />

            <button
              type="button"
              className="customer-login-button"
            >
              Verify & Login
            </button>

          </form>

        )}


        {/* Register */}
        <p className="customer-register-text">
          Don't have a customer account?
          <a href="/customer/register">
            {" "}Register
          </a>
        </p>

      </div>

    </div>
  );
}

export default CustomerLogin;