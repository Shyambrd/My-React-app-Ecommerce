
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cart,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginExpiry");

    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>BuyNow.com</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

        {!isLoggedIn && (
          <Link to="/login">
            Login
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;