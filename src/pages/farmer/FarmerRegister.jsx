function FarmerRegister() {
  return (
    <div className="login-page">

      <div className="login-box register-box">

        <div className="login-logo">👨‍🌾</div>

        <h1>Farmer Registration</h1>

        <p>Create your AgriMart farmer account</p>

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
            placeholder="Enter email"
          />

          <label>Village</label>

          <input
            type="text"
            placeholder="Enter your village"
          />

          <label>District</label>

          <input
            type="text"
            placeholder="Enter your district"
          />

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

          <button className="login-button">
            Create Farmer Account
          </button>

        </form>

        <p className="register-text">
          Already have an account?
          <a href="/farmer/login"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default FarmerRegister;