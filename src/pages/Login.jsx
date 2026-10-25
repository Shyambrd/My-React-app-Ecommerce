import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminD.css"

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

if (
  loginData.username === "admin" &&
  loginData.password === "admin123"
) {
  localStorage.setItem("isLoggedIn", "true");

  setIsLoggedIn(true);

  navigate("/dashboard");
} else {
    setError("Invalid Username or Password");
  }
};

  return (
    <div className="page-container">
      <div className="login-card">
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-buy"
          >
            Login
          </button>
        </form>


      </div>
    </div>
  );
}

export default Login;
