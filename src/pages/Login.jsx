
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login function
  function handleLogin(e) {

    e.preventDefault();

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Successful login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    navigate("/dashboard");
  }

  return (
    <div className="login-container">

      {/* Left Section */}
      <div className="login-left">
        <h2>ShopAdmin</h2>

        <h1>Welcome Back!</h1>

        <p>
          Manage your products and orders
          from one simple dashboard.
        </p>
      </div>

      {/* Right Section */}
      <div className="login-right">

        <form onSubmit={handleLogin}>

          <h2>Sign In</h2>

          <p>Enter your details to continue.</p>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
