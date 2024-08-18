import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    userInfo: null,
    loading: false,
    error: null
};

// Create async thunk for login
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const { data } = await axios.post(
                '/api/users/login/',
                { username: email, password: password },
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message);
        }
    }
);

// Create async thunk for logout
export const logout = createAsyncThunk(
    'user/logout',
    async (_, { dispatch }) => {
        localStorage.removeItem('userInfo');
        dispatch(userLogout());
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const { data } = await axios.post(
                '/api/users/register/',
                { name, email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }
);

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.userInfo = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
