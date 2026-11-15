import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginWithEmail, requestOtp, resetPassword, verifyOtp } from "../../utils/storage";

function FarmerLogin() {
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
    const result = loginWithEmail("farmer", email, password);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/farmer/dashboard", { replace: true });
  }

  function sendCode(event) {
    event.preventDefault();
    const result = requestOtp("farmer", mobile);
    setNotice(result.message || "");
    setOtpNote(result.ok ? `Your code is ${result.code}` : "");
  }

  function handleOtp(event) {
    event.preventDefault();
    const result = verifyOtp("farmer", mobile, otp);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/farmer/dashboard", { replace: true });
  }

  function handleReset(event) {
    event.preventDefault();
    const result = resetPassword("farmer", reset.email, reset.password, reset.confirm);
    setNotice(result.message);
    if (result.ok) setForgot(false);
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">🌾</div>
        <h1>Farmer Login</h1>
        <p>Welcome back, Farmer!</p>

        {notice && <p className="form-error" role="status">{notice}</p>}

        <div className="login-options">
          <button
            type="button"
            className={loginType === "email" ? "active-option" : ""}
            onClick={() => setLoginType("email")}
          >
            📧 Email Login
          </button>
          <button
            type="button"
            className={loginType === "mobile" ? "active-option" : ""}
            onClick={() => setLoginType("mobile")}
          >
            📱 Mobile Login
          </button>
        </div>

        {loginType === "email" && !forgot && (
          <form onSubmit={handleEmail}>
            <label htmlFor="farmer-email">Email</label>
            <input
              id="farmer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="farmer-password">Password</label>
            <input
              id="farmer-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <button type="submit" className="login-button">Login</button>
            <button type="button" className="forgot-password" onClick={() => setForgot(true)}>
              Forgot Password?
            </button>
          </form>
        )}

        {loginType === "email" && forgot && (
          <form onSubmit={handleReset}>
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              value={reset.email}
              onChange={(event) => setReset({ ...reset, email: event.target.value })}
              placeholder="Registered email"
              required
            />
            <label htmlFor="reset-password">New password</label>
            <input
              id="reset-password"
              type="password"
              value={reset.password}
              onChange={(event) => setReset({ ...reset, password: event.target.value })}
              placeholder="At least 6 characters"
              required
            />
            <label htmlFor="reset-confirm">Confirm password</label>
            <input
              id="reset-confirm"
              type="password"
              value={reset.confirm}
              onChange={(event) => setReset({ ...reset, confirm: event.target.value })}
              placeholder="Repeat the new password"
              required
            />
            <button type="submit" className="login-button">Update password</button>
            <button type="button" className="forgot-password" onClick={() => setForgot(false)}>
              Back to login
            </button>
          </form>
        )}

        {loginType === "mobile" && (
          <form onSubmit={handleOtp}>
            <label htmlFor="farmer-mobile">Mobile Number</label>
            <input
              id="farmer-mobile"
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Enter mobile number"
              required
            />
            <button type="button" className="login-button" onClick={sendCode}>
              Send OTP
            </button>
            {otpNote && <p className="form-success" role="status">{otpNote}</p>}
            <label htmlFor="farmer-otp">OTP</label>
            <input
              id="farmer-otp"
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit" className="login-button">Verify & Login</button>
          </form>
        )}

        <p className="register-text">
          Don&apos;t have a farmer account? <Link to="/farmer/register" state={location.state}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default FarmerLogin;
