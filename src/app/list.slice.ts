
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getToken, logout } from './auth.slice';
import { Item } from '../types';
export interface ItemData {
    name: string;
    measurement_units: string;
    code: string;
    description: string;
    token: string;
}

export interface EditItemData extends ItemData {
    id: number;
}

interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalItems:number;
    itemName: string;
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
    itemName: '',
    sortBy: 'name',
    sortOrder: 'ASC',
};

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (arg: {
        warehouseId: string;
        page: number;
        pageSize: number;
        token: string | null;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
        itemName?: string; 
    }, { dispatch, rejectWithValue, getState }) => {

        
        try {
            console.log(`arg`, arg);
            const response = await axios.get(`/api/items`, {
                
                headers: { Authorization: arg.token },
                params: {
                    warehouseId: arg.warehouseId,
                    page: arg.page,
                    pageSize: arg.pageSize,
                    sortBy: arg.sortBy || 'name',
                    sortOrder: arg.sortOrder || 'ASC',
                    itemName: arg.itemName || '',
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

export const createItem = createAsyncThunk(
    'items/createItem',
    async (itemData: ItemData, { rejectWithValue }) => {
        try {
            const { token, ...dataWithoutToken } = itemData;
            console.log(`Token for authorization:`, token);
            const response = await axios.post('/api/items', dataWithoutToken, {
                headers: { Authorization: token },
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Unable to create item');
        }
    }
);

export const editItem = createAsyncThunk(
    'items/editItem',
    async (itemData: EditItemData, { rejectWithValue }) => {
        try {
            const { token, id, ...dataWithoutTokenAndId } = itemData;
            console.log(`Token for authorization:`, token);
            const response = await axios.patch(`/api/items/${id}`, dataWithoutTokenAndId, {
                headers: { Authorization: token },
            });
            return response.data;
        } catch (error: any) {
            // It's better to use a more specific error type, like AxiosError from 'axios'
            return rejectWithValue(error.response?.data?.message || 'Unable to edit item');
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
        setSearchTerm(state, action: PayloadAction<string>) {
            state.itemName = action.payload;
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
            .addCase(createItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
            
    },
});

export const { setPage, setPageSize, setSortBy, setSortOrder, setSearchTerm } = itemSlice.actions;

export default itemSlice.reducer;
