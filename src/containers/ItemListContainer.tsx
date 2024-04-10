import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList/ItemList';
import Pagination from '../components/Pagination/Pagination';
import SelectPageSize from '../components/SelectPageSize/SelectPageSize';
import { useAppDispatch, useAppSelector } from '../app/store';
import {  fetchItems,  setPage, setPageSize } from '../app/list.slice';
import useAuthToken from '../hooks/useAuthToken';


const ItemListContainer = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, page, pageSize } = useAppSelector((state) => state.list);
    const { token } = useAppSelector((state) => state.auth);
    
    useEffect(() => {
        if (token) {
            dispatch(fetchItems({
                warehouseId: '6aac3263-ca1f-4b4e-8973-3a948873d9de',
                page: page,
                pageSize: pageSize,
                token: token,
            }));
        }
    }, [page, pageSize, token]);

    const handlePageSizeChange = (newPageSize: number) => {
        dispatch(setPageSize(newPageSize));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    // Заглушка функции showModalWithItemData, замените на вашу реализацию
    const showModalWithItemData = (itemId: number) => {
        console.log('Showing modal for item:', itemId);
    };

    const openEditModal = (itemId: number) => {
        showModalWithItemData(itemId);
    };

    // Отображение загрузки или ошибки, если они есть
    if (loading) return <div>Loading...</div>;
 

    return (
        <div>
            <ItemList items={items} onEdit={openEditModal} />
            <div>
                <Pagination
                    currentPage={page}
                    // totalPages должен быть получен от сервера или вычислен на основе общего количества элементов
                    totalPages={Math.ceil(pageSize)}
                    onPageChange = { handlePageChange }
                        />
                        <SelectPageSize
                            options={[5, 10, 20, 50]}
                            selectedOption={pageSize}
                            onSelect={handlePageSizeChange}
                        />
            </div>
        </div>
    );
};

export default ItemListContainer;