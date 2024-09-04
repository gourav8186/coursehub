import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setCourses } from "../store/courseSlice";
import { setFilter, setSearchQuery } from "../store/courseSlice";

const Filters = () => {
  const course = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0f57f5d5-9a70-4fdf-af23-159eae2d2d05")
      .then((response) => {
        dispatch(setCourses(response.data.courses));
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ name, value }));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <section className="filterbox">
      <h4>Filter</h4>
      <div className="filters">
        <div className="category">
          {/* <span>Category By</span> */}
          <select
            name="category"
            onChange={handleFilterChange}
            className="optionBox"
          >
            <option value="">Categories</option>
            {course.map((item, index) => (
              <option key={index} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>

        <div className="search">
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search Here.."
          />
          <IoIosSearch className="searchIcon" />
        </div>
      </div>
    </section>
  );
};

export default Filters;
