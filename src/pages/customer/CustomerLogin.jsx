import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginWithEmail, requestOtp, resetPassword, verifyOtp } from "../../utils/storage";

function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpNote, setOtpNote] = useState("");
  const [notice, setNotice] = useState("");
  const [forgot, setForgot] = useState(false);
  const [reset, setReset] = useState({ email: "", password: "", confirm: "" });

  function handleEmail(event) {
    event.preventDefault();
    const result = loginWithEmail("customer", email, password);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/customer/home", { replace: true });
  }

  function sendCode(event) {
    event.preventDefault();
    const result = requestOtp("customer", mobile);
    setNotice(result.message || "");
    setOtpNote(result.ok ? `Your code is ${result.code}` : "");
  }

  function handleOtp(event) {
    event.preventDefault();
    const result = verifyOtp("customer", mobile, otp);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/customer/home", { replace: true });
  }

  function handleReset(event) {
    event.preventDefault();
    const result = resetPassword("customer", reset.email, reset.password, reset.confirm);
    setNotice(result.message);
    if (result.ok) setForgot(false);
  }

  return (
    <div className="customer-login-page">
      <div className="customer-login-box">
        <div className="customer-login-logo">🛒</div>
        <h1>Customer Login</h1>
        <p>Welcome back to AgriMart!</p>
        {notice && <p className="form-error" role="status">{notice}</p>}

        <div className="customer-login-options">
          <button
            type="button"
            className={loginType === "email" ? "customer-active-option" : ""}
            onClick={() => setLoginType("email")}
          >
            📧 Email Login
          </button>
          <button
            type="button"
            className={loginType === "mobile" ? "customer-active-option" : ""}
            onClick={() => setLoginType("mobile")}
          >
            📱 Mobile Login
          </button>
        </div>

        {loginType === "email" && !forgot && (
          <form onSubmit={handleEmail}>
            <label htmlFor="customer-email">Email</label>
            <input
              id="customer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="customer-password">Password</label>
            <input
              id="customer-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <button type="submit" className="customer-login-button">Login</button>
            <button type="button" className="customer-forgot-password" onClick={() => setForgot(true)}>
              Forgot Password?
            </button>
          </form>
        )}

        {loginType === "email" && forgot && (
          <form onSubmit={handleReset}>
            <label htmlFor="customer-reset-email">Email</label>
            <input
              id="customer-reset-email"
              type="email"
              value={reset.email}
              onChange={(event) => setReset({ ...reset, email: event.target.value })}
              placeholder="Registered email"
              required
            />
            <label htmlFor="customer-reset-password">New password</label>
            <input
              id="customer-reset-password"
              type="password"
              value={reset.password}
              onChange={(event) => setReset({ ...reset, password: event.target.value })}
              required
            />
            <label htmlFor="customer-reset-confirm">Confirm password</label>
            <input
              id="customer-reset-confirm"
              type="password"
              value={reset.confirm}
              onChange={(event) => setReset({ ...reset, confirm: event.target.value })}
              required
            />
            <button type="submit" className="customer-login-button">Update password</button>
            <button type="button" className="customer-forgot-password" onClick={() => setForgot(false)}>
              Back to login
            </button>
          </form>
        )}

        {loginType === "mobile" && (
          <form onSubmit={handleOtp}>
            <label htmlFor="customer-mobile">Mobile Number</label>
            <input
              id="customer-mobile"
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Enter mobile number"
              required
            />
            <button type="button" className="customer-login-button" onClick={sendCode}>
              Send OTP
            </button>
            {otpNote && <p className="form-success" role="status">{otpNote}</p>}
            <label htmlFor="customer-otp">OTP</label>
            <input
              id="customer-otp"
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit" className="customer-login-button">Verify & Login</button>
          </form>
        )}

        <p className="customer-register-text">
          Don&apos;t have a customer account? <Link to="/customer/register" state={location.state}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerLogin;
