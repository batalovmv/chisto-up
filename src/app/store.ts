import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import  itemsSlice  from './list.slice';
import authSlice from './auth.slice';





export const store = configureStore({
    reducer: {
        list: itemsSlice,
        auth : authSlice
       
        
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;