import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@/api/api.ts';
import axios from 'axios';
import { RootState } from './store';

export type Item = {
    id: number;
    name: string;
    unit: string;
    sku: string;
};

interface CreateItemArgs {
    itemData: ItemData;
}
interface EditItemArgs {
    id: string;
    itemData: ItemData;
}


interface FetchItemsArgs {
    warehouseId: string;
    page: number; // Make sure 'page' is defined
    pageSize: number;
    searchQuery: string;
    sortOrder: 'asc' | 'desc';
  
}
interface AxiosError {
    message: string;
    // Другие поля, которые могут вас интересовать
}
export interface ItemData {
    // Define the structure that matches your item data properties
    name: string;
    price: number;
    // ... other properties
}

export const login = createAsyncThunk(
    'users/login',
    async (_, { rejectWithValue }) => {
        try {
            const credentials = { username: 'admin', password: 'admin' };
            const response = await axios.post('https://hcateringback-dev.unitbeandev.com/api/auth/login', credentials);
            return response.data.token;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AxiosError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);
export const fetchItems = createAsyncThunk<Item[], FetchItemsArgs, { state: RootState, rejectValue: AxiosError }>(
    'items/fetchItems',
    async (args: FetchItemsArgs, { getState, rejectWithValue }) => {
        try {
            const { warehouseId, page, pageSize, searchQuery, sortOrder } = args;
            const token = getState().list.token;
            const response = await axios.get('https://hcateringback-dev.unitbeandev.com/api/items', {
                params: { warehouseId, page, pageSize, search: searchQuery, sort: sortOrder },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AxiosError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const createItem = createAsyncThunk<Item, CreateItemArgs, { state: RootState, rejectValue: AxiosError }>(
    'items/create',
    async (args, { getState, rejectWithValue }) => {
        try {
            const token = getState().list.token;
            const response = await axios.post(`https://hcateringback-dev.unitbeandev.com/api/items`, args.itemData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; 
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AxiosError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const editItem = createAsyncThunk<Item[], EditItemArgs, { state: RootState, rejectValue: AxiosError }>(
    'items/edit',
    async ({ id, itemData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().list.token;
            const response = await axios.put(`https://hcateringback-dev.unitbeandev.com/api/items/${id}`, itemData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AxiosError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);
const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        data: [] as Item[],
        loading: false,
        error: null as string | null,
        page: 1,
        pageSize: 10,
        searchQuery: '',
        sortOrder: 'asc', // 'asc' или 'desc'
        token: '',
        totalItems: 0,
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setPageSize(state, action) {
            state.pageSize = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An unknown error occurred';
            })
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An unknown error occurred';
            })
            .addCase(createItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An unknown error occurred';
            })
            .addCase(editItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editItem.fulfilled, (state, action) => {
                state.loading = false;
                // Find the index using the id from the action payload
                const index = state.data.findIndex(item => item.id === action.payload[0].id);
                if (index !== -1) {
                    // Replace the item at the index with the new item data
                    state.data[index] = action.payload[0];
                }
            })
            .addCase(editItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An unknown error occurred';
            });
    },
});

export const { setSearchQuery, setPageSize, setPage, setSortOrder } = itemsSlice.actions;
export default itemsSlice.reducer;
