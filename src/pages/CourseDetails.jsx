import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { enrollCourse } from "../store/courseSlice";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const enrolledCourses = useSelector((state) => state.courses.enrolledCourses);

  const course = useSelector((state) =>
    state.courses.courses.find((c) => c.id.toString() === courseId)
  );

  const handleEnroll = () => {
    if (
      course.enrollmentStatus === "Closed" ||
      course.enrollmentStatus === "InProgress"
    ) {
      toast.info("Enrollment for this course is currently closed.");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in the course.");
      return;
    }

    const isAlreadyEnrolled = enrolledCourses.some(
      (enrolledCourse) => enrolledCourse.id === course.id
    );

    if (isAlreadyEnrolled) {
      toast.info("You are already enrolled in this course!");
    } else {
      dispatch(enrollCourse(course));
      toast.success("Successfully enrolled in the course!");
      navigate("/dashboard");
    }
  };

  if (!course) {
    return <div className="text-center mt-5">Course not found</div>;
  }

  return (
    <section className="container courseDetails">
      <div className="breadcrumb">
        <Link to="/">
          <span>Back</span>
        </Link>
        <MdKeyboardArrowRight className="arrow" />
        <span className="activeLink">React JS</span>
      </div>

      <div className="details-section">
        <div className="upersection">
          <div className="leftBox">
            <h1>{course.name}</h1>
            <p className="description">{course.description}</p>
            <p>
              Course duration : <span>{course.duration}</span>
            </p>
            <p>
              Location : <span>{course.location}</span>
            </p>
            <p>
              Schedule : <span>{course.schedule}</span>
            </p>
            <p>
              Instructor : <span>{course.instructor}</span>
            </p>
            <div className="prerequisite">
              <h4>Pre-requisites </h4>
              {course.prerequisites.join(", ")}
            </div>

            <div className="accordionBox">
              <h4>Course Content </h4>
              {course.syllabus.map((item, index) => (
                <Accordion className="accordion" key={index}>
                  <Accordion.Header>{item.week} Week</Accordion.Header>
                  <Accordion.Body>
                    {item.topic} - {item.content}
                  </Accordion.Body>
                </Accordion>
              ))}
            </div>
          </div>
          <div className="rightBox">
            <div className="previewbox">
              <img loading="lazy" src={course.thumbnail} alt="thumbnail" />
            </div>
            <div className="boxCaption">
              <div className="prices">
                <h2>₹ {course.price}</h2>
                <span>
                  Enrollment Status -{" "}
                  <span className="status">{course.enrollmentStatus}</span>
                </span>
                <p>30-Day Money-Back Guarantee Full Lifetime Access</p>
              </div>

              <button type="button" onClick={handleEnroll} className="enrlBtn">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
