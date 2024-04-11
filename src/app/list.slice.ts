
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getToken, logout } from './auth.slice';
export interface Item {
    id: number;
    name: string | null;
    description?: string | null;
    measurement_units?: string | null;
    code?: string | null; 
}

interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalItems:number;
    searchTerm: string;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}

const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    pageSize: 10,
    totalItems: 0,
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'ASC',
};

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (arg: { warehouseId: string; page: number; pageSize: number; token: string | null; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }, { dispatch, rejectWithValue, getState }) => {
        
        try {
            console.log(`arg`, arg);
            const response = await axios.get(`/api/items`, {
                
                headers: { Authorization: arg.token },
                params: {
                    warehouseId: arg.warehouseId,
                    page: arg.page,
                    pageSize: arg.pageSize,
                    sortBy: arg.sortBy || 'name',
                    sortOrder: arg.sortOrder || 'ASC'
                },
            });
           
            return response.data;
        } catch (error) { //сделал автологин для удобства тестов , сессии короткие слишком
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                dispatch(logout()).then(() => {
                    // Теперь, когда мы вышли, можно попытаться войти снова
                    dispatch(getToken({ login: 'admin', password: 'admin' }));
                });
                return rejectWithValue('Token expired, user logged out.');
            }
            return rejectWithValue('Unable to fetch items');
        }
    }
);
export const fetchItemsByName = createAsyncThunk(
    'items/fetchItemsByName', // Unique identifier for this thunk
    async (arg: { searchTerm: string; token: string | null; }, { dispatch, rejectWithValue }) => {
        try {
            console.log(`arg`, arg);
            const response = await axios.get(`/api/items`, {
                headers: { Authorization: arg.token },
                params: {
                    pageSize: 10000, // Fetch all items, assuming 10,000 is your max limit
                },
            });

           
            const filteredItems = response.data.result.filter((item: Item) =>
                item.name && item.name.toLowerCase().includes(arg.searchTerm.toLowerCase())
            );

            return {
                result: filteredItems,
                total: filteredItems.length,
            };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                dispatch(logout()).then(() => {
                    dispatch(getToken({ login: 'admin', password: 'admin' }));
                });
                return rejectWithValue('Token expired, user logged out.');
            }
            return rejectWithValue('Unable to fetch items');
        }
    }
);

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setSortOrder(state, action: PayloadAction<'ASC' | 'DESC'>) {
            state.sortOrder = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.result; 
                state.totalItems = action.payload.total; 
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })
            
    },
});

export const { setPage, setPageSize, setSortBy, setSortOrder } = itemSlice.actions;

export default itemSlice.reducer;
