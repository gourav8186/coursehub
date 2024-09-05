import thumbnail from "../assets/thumbnails/images.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Skeleton from "./Skeleton";

const CourseCard = () => {
  const { filteredCourses } = useSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filteredCourses]);

  if (loading) {
    return (
      <div className="row">
        {filteredCourses.map((items) => (
          <Skeleton key={items.id} />
        ))}
      </div>
    );
  }

  return (
    <section className="card-container">
      <div className="row">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="col-xs-6 col-sm-4 col-md-6 col-lg-4 col-xl-3"
            >
              <Link to={`/course/${course.id}`}>
                <div className="card">
                  <div className="thumbnail">
                    <img
                      loading="lazy"
                      src={course.thumbnail || thumbnail}
                      alt="thumbnail"
                    />
                    <span className="tag">{course.category}</span>
                  </div>
                  <div className="cardCaptions">
                    <h5 className="course-price">₹ {course.price}</h5>
                    <h6 className="course-name">{course.name}</h6>
                    <p className="course-desc">{course.description}</p>
                    <span>Instructor - {course.instructor}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No courses available</p>
        )}
      </div>
    </section>
  );
};

export default CourseCard;
