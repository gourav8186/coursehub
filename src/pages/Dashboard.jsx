import EnrollCourse from "../components/EnrollCourse";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadEnrolledCourses } from "../store/courseSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.username) {
      const storedCourses = JSON.parse(localStorage.getItem(user.username));
      if (storedCourses) {
        dispatch(loadEnrolledCourses(storedCourses));
      }
    }
  }, [dispatch, user]);
  return (
    <section className="dashboard">
      <div className="headerTop">
        <div className="headText">
          <h1>My Dashboard</h1>
          <h5>Welcome, {user?.name}</h5>
        </div>
        <div className="enrolButton">
          <Link to="/">
            <button type="button" className="enrlBtn">
              New Course
            </button>
          </Link>
        </div>
      </div>

      <div className="enrolledCorses">
        <EnrollCourse />
      </div>
    </section>
  );
};

export default Dashboard;
