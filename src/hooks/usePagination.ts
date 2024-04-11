import { setPage, setPageSize } from "../app/list.slice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useCallback } from 'react';


interface UsePaginationReturn {
    page: number;
    pageSize: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
    handlePageSizeChange: (newPageSize: number) => void;
}

export const usePagination = (totalItems: number): UsePaginationReturn => {
    const dispatch = useAppDispatch();
    const pageSize = useAppSelector((state) => state.list.pageSize);
    const page = useAppSelector((state) => state.list.page);
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const handlePageChange = useCallback((newPage: number) => {
        dispatch(setPage(newPage));
    }, [dispatch]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        dispatch(setPageSize(newPageSize));
        dispatch(setPage(1));
    }, [dispatch]);

    return {
        page,
        pageSize,
        totalPages,
        handlePageChange,
        handlePageSizeChange,
    };
};