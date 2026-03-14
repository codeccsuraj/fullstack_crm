import { createSlice } from '@reduxjs/toolkit';

const session = localStorage.getItem("session");

const initialState = {
    user: session ? JSON.parse(session).user : null,
    token: session ? JSON.parse(session).token : null,
    isAuthenticated: session ? true : false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserSession: (state, action) => {
            const { user, token } = action.payload;

            state.user = user,
                state.token = token,
                state.isAuthenticated = true;

            // persist session
            localStorage.setItem(
                "session",
                JSON.stringify({ user, token })
            );
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("session");
        }
    }
});

export const { setUserSession, logout } = authSlice.actions;
export default authSlice.reducer;