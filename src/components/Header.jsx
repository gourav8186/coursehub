import { useState } from "react";
import LoginPopup from "./LogIn";
import { logout } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("enrolledCourses");
    dispatch(logout());
    toast.success("Logged out successfully!");
  };
  return (
    <header>
      <Link to="/">
        <div className="logo">Course HUB</div>
      </Link>

      <div className="nav-items">
        <ul>
          <li>{isAuthenticated && <Link to="/">Home</Link>}</li>
          <li>{isAuthenticated && <Link to="/dashboard">Dashboard</Link>} </li>

          {isAuthenticated ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <li onClick={() => setShowLogin(true)}>Login</li>
          )}
        </ul>

        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      </div>
    </header>
  );
};

export default Header;
