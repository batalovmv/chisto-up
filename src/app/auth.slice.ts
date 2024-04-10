
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
interface Credentials {
    login: string;
    password: string;
}
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null | unknown;
}

export const getToken = createAsyncThunk<string, Credentials, { rejectValue: string }>(
    'auth/getToken',
    async (credentials, { rejectWithValue }) => {
        try {
            const authResponse = await axios.post('/api/auth/login', credentials);
            const token = authResponse.data.access_token;
            localStorage.setItem('auth_token', token);
            return token;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const detail = error.response.data.detail || 'An unknown error occurred';
                console.error('Error during authentication', detail);
                return rejectWithValue(detail);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    localStorage.removeItem('auth_token'); // Удаляем токен из localStorage
    return null;
});


const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
    // Дополнительные поля для состояния items, если они есть
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload; // Сохраняем токен в состоянии
            })
            .addCase(getToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
                state.token = null; 
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
            })
            
      
    },
});
export const { setToken } = authSlice.actions;

export default authSlice.reducer;