function CustomerRegister() {
  return (
    <div className="customer-login-page">
      <div className="customer-login-box customer-register-box">

        <div className="customer-login-logo">🛒</div>

        <h1>Create Account</h1>
        <p>Join AgriMart as a customer</p>

        <form>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Address</label>
          <textarea
            placeholder="Enter your address"
            rows="3"
          ></textarea>

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
          />

          <button
            type="button"
            className="customer-login-button"
          >
            Create Account
          </button>
        </form>

        <p className="customer-register-text">
          Already have an account?
          <a href="/customer/login"> Login</a>
        </p>

      </div>
    </div>
  );
}

export default CustomerRegister;