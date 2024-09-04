import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courseSlice';
import authReducer from './authSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
    },
});

export default store;
