import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { setEnrolledCourses } from "../store/courseSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const LoginPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses"));

    if (token && user) {
      dispatch(login({ token, user }));
      if (enrolledCourses) {
        dispatch(setEnrolledCourses(enrolledCourses));
      }
    }
  }, [dispatch]);

  const handleLogin = async () => {
    if (username.trim() === "") {
      toast.error("Please enter a username.");
      return;
    }
    const token = "ABCDEFGH";
    const user = { id: "user_id", name: username };

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    dispatch(setEnrolledCourses(enrolledCourses));

    dispatch(login({ token, user }));
    onClose();
    toast.success("Logged in successfully!");
  };

  return (
    <div className="login-popup">
      <div className="loginBox">
        <h1 className="logo logocolor">COURSE HUB</h1>

        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <button className="enrlBtn" onClick={handleLogin}>
          Login
        </button>
        <span className="closeBtn" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </span>
      </div>
    </div>
  );
};

export default LoginPopup;
