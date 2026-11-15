import { useState } from "react";

function FarmerLogin() {
  const [loginType, setLoginType] = useState("email");

  return (
    <div className="login-page">

      <div className="login-box">

        <div className="login-logo">🌾</div>

        <h1>Farmer Login</h1>

        <p>Welcome back, Farmer!</p>

        {/* Login Options */}
        <div className="login-options">

          <button
            className={loginType === "email" ? "active-option" : ""}
            onClick={() => setLoginType("email")}
          >
            📧 Email Login
          </button>

          <button
            className={loginType === "mobile" ? "active-option" : ""}
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

            <button className="login-button">
              Login
            </button>

            <a href="#" className="forgot-password">
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

            <button className="login-button">
              Send OTP
            </button>

            <label>OTP</label>

            <input
              type="text"
              placeholder="Enter OTP"
            />

            <button className="login-button">
              Verify & Login
            </button>

          </form>
        )}


        <p className="register-text">
          Don't have a farmer account?
          <a href="/farmer/register"> Register</a>
        </p>

      </div>

    </div>
  );
}

export default FarmerLogin;