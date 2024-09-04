import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    user: JSON.parse(localStorage.getItem('user')),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { token, user } = action.payload;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            state.isAuthenticated = true;
            state.user = user;
        },
        logout(state) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            state.isAuthenticated = false;
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
