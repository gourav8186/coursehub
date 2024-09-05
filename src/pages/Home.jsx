import CourseCard from "../components/CourseCard";
import { useEffect } from "react";
import Filters from "../components/Filters";
import { useDispatch } from "react-redux";
import { setCourses } from "../store/courseSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0f57f5d5-9a70-4fdf-af23-159eae2d2d05")
      .then((response) => {
        dispatch(setCourses(response.data.courses));
      });
  }, [dispatch]);
  return (
    <main className="container">
      <Filters />
      <CourseCard />
    </main>
  );
};

export default Home;
