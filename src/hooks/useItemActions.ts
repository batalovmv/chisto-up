
import { useAppDispatch } from "../app/store";

import { EditItemData, ItemData, createItem, editItem, fetchItems, setPage, setSearchTerm, setSortBy, setSortOrder } from "../app/list.slice";
import { Item } from "../types";
import { useCallback } from "react";

const useItemActions = (warehouseId: string, token: string | null) => {
    const dispatch = useAppDispatch();

    const fetchItemsWithParams = useCallback((itemName: string, page: number, pageSize: number, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
        if (token) {
            dispatch(fetchItems({
                warehouseId,
                page,
                pageSize,
                token,
                sortBy,
                sortOrder,
                itemName
            }));
        }
    }, [dispatch, token, warehouseId]);

    const handleSort = useCallback((newSortBy: string, currentSortBy: string, currentSortOrder: string) => {
        const newSortOrder = currentSortBy === newSortBy && currentSortOrder === 'ASC' ? 'DESC' : 'ASC';
        dispatch(setSortBy(newSortBy));
        dispatch(setSortOrder(newSortOrder));
    }, [dispatch]);

    const handleSearch = useCallback((searchTerm: string) => {
        dispatch(setPage(1));
        dispatch(setSearchTerm(searchTerm));
    }, [dispatch]);

    const handleCreateItem = useCallback((formData: { name: string; measurement_units?: string; code: string; description?: string }) => {
        if (token) {
            const itemData: ItemData = {
                ...formData,
                measurement_units: formData.measurement_units || 'шт',
                description: formData.description || '',
                code: formData.code || '',
                token: token,
            };
            dispatch(createItem(itemData));
        }
    }, [dispatch, token]);

    const handleEditItem = useCallback((item: Item) => {
        if (item.id && token) {
            const itemData: EditItemData = {
                id: item.id,
                token: token,
                name: item.name,
                measurement_units: item.measurement_units || 'шт',
                code: item.code || '',
                description: item.description || '',
            };
            dispatch(editItem(itemData));
        } else {
            console.error('Item id or token is missing');
        }
    }, [dispatch, token]);

    return {
        fetchItemsWithParams,
        handleSort,
        handleSearch,
        handleCreateItem,
        handleEditItem
    };
};

export default useItemActions;