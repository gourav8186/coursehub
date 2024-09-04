import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { markCourseCompleted } from "../store/courseSlice";
import { MdOutlineDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";

const EnrollCourse = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.courses.enrolledCourses);

  const handleMarkCompleted = (courseId) => {
    setTimeout(() => {
      dispatch(markCourseCompleted(courseId));
      toast.success("Course marked as completed!");
    }, 1000);
  };
  return (
    <section className="card-container">
      <div className="row">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course, index) => (
            <div
              key={index}
              className="col-xs-6 col-sm-4 col-md-6 col-lg-4 col-xl-3"
            >
              <div className="card">
                <div className="thumbnail">
                  <img src={course.thumbnail} alt="thumbnail image" />
                  <span className="tag">React Js</span>
                </div>
                <div className="cardCaptions">
                  <h6 className="course-name">Introduction to React Native</h6>
                  <div className="d-flex flex-column">
                    <span>
                      <strong>Instructor -</strong> John Doe
                    </span>
                    <span>
                      <strong>Due on -</strong> 02 Feb 2024
                    </span>
                  </div>
                  <div className="progressBar py-3">
                    <ProgressBar
                      now={course.progress || 0}
                      label={`${course.progress || 0}%`}
                      visuallyHidden
                    />
                    <span>{course.progress || 0}% Completed</span>
                  </div>

                  {!course.completed ? (
                    <button
                      onClick={() => handleMarkCompleted(course.id)}
                      className="enrlBtn"
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <span className="completed-label">
                      Course Completed <MdOutlineDownloadDone />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">
            You have not enrolled in any courses yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default EnrollCourse;
