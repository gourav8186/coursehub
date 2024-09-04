import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    enrolledCourses: JSON.parse(localStorage.getItem('enrolledCourses')) || [],
    filteredCourses: [],
    filters: {
        name: '',
        instructor: '',
        category: '',
    },
    searchQuery: '',
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
            state.filteredCourses = action.payload;
        },
        setFilter: (state, action) => {
            state.filters[action.payload.name] = action.payload.value;
            state.filteredCourses = state.courses.filter(course => {
                const { category } = state.filters;
                const matchesSearchQuery = course.name.toLowerCase().includes(state.searchQuery.toLowerCase());

                return (
                    matchesSearchQuery &&
                    (!category || course.category.includes(category))
                );
            });
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredCourses = state.courses.filter(course => {
                const { name, category, instructor } = state.filters;
                const searchWords = state.searchQuery.toLowerCase().split(' ');

                return searchWords.every(word =>
                    course.name.toLowerCase().includes(word) ||
                    course.category.toLowerCase().includes(word) ||
                    course.instructor.toLowerCase().includes(word)
                ) &&
                    (!name || course.name.toLowerCase().includes(name.toLowerCase())) &&
                    (!instructor || course.instructor.toLowerCase().includes(category.toLowerCase())) &&
                    (!category || course.category.toLowerCase().includes(category.toLowerCase()))

            });
        },
        enrollCourse(state, action) {
            const course = action.payload;
            const isAlreadyEnrolled = state.enrolledCourses.some(
                (enrolledCourse) => enrolledCourse.id === course.id
            );

            if (!isAlreadyEnrolled) {
                state.enrolledCourses.push(course);
                localStorage.setItem('enrolledCourses', JSON.stringify(state.enrolledCourses));
            }
        },
        setEnrolledCourses(state, action) {
            state.enrolledCourses = action.payload;
        },
        loadEnrolledCourses(state, action) {
            state.enrolledCourses = action.payload;
        },
        markCourseCompleted: (state, action) => {
            const course = state.enrolledCourses.find(course => course.id === action.payload);
            if (course) {
                course.completed = true;
                course.progress = 100;
                localStorage.setItem('enrolledCourses', JSON.stringify(state.enrolledCourses));
            }
        },
    },
});

export const { setCourses, enrollCourse, markCourseCompleted, loadEnrolledCourses, setEnrolledCourses, setFilter, setSearchQuery } = coursesSlice.actions;

export default coursesSlice.reducer;
