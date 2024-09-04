import { useState, useRef, useEffect } from "react";
import LoginPopup from "./LogIn";
import { logout } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const menuBtnRef = useRef();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsShow(!isShow);
  };
  const handleDocumentClick = (event) => {
    if (menuBtnRef.current && !menuBtnRef.current.contains(event.target)) {
      setIsShow(isShow);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("enrolledCourses");
    dispatch(logout());
    window.location.reload();
    toast.success("Logged out successfully!");
  };
  return (
    <header>
      <Link to="/">
        <div className="logo">Course HUB</div>
      </Link>

      <div className="nav-items">
        <div onClick={toggleMenu} className="mobileToggle">
          {isShow ? <IoCloseOutline /> : <RxHamburgerMenu />}
        </div>
        <ul
          className={`linkBox ${isShow ? "toggleMenu" : ""}`}
          ref={menuBtnRef}
        >
          <li>{isAuthenticated && <Link to="/">Home</Link>}</li>
          <li>{isAuthenticated && <Link to="/dashboard">Dashboard</Link>} </li>

          <li>
            {isAuthenticated ? (
              <span onClick={handleLogout}>Sign Out</span>
            ) : (
              <span onClick={() => setShowLogin(true)}>Sign In</span>
            )}
          </li>
        </ul>

        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      </div>
    </header>
  );
};

export default Header;
