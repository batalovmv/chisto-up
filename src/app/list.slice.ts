
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    unit: string;
    sku: string;
   
}

interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
}

const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    pageSize: 10
};

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (arg: { warehouseId: string; page: number; pageSize: number; token: string; search?: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/items`, {
                headers: { Authorization: arg.token },
                params: {
                    warehouseId: arg.warehouseId,
                    page: arg.page,
                    pageSize: arg.pageSize,
                    search: arg.search || '',
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to fetch items');
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items; // Присвоение полученных элементов состоянию
                state.page = action.payload.page; // Обновление номера страницы, если она пришла от сервера
                state.pageSize = action.payload.pageSize; // Обновление размера страницы, если он пришел от сервера
                // Другие данные, если они возвращаются от сервера (например, общее количество элементов для пагинации), тоже можно обработать здесь
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            });
    },
});

export const { setPage, setPageSize } = itemSlice.actions;

export default itemSlice.reducer;
