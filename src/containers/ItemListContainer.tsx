import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList/ItemList';
import Pagination from '../components/Pagination/Pagination';
import SelectPageSize from '../components/SelectPageSize/SelectPageSize';
import { useAppDispatch, useAppSelector } from '../app/store';
import { useSelector } from 'react-redux';
import { Item, ItemData, editItem, fetchItems, login, setPage, setPageSize } from '../app/list.slice';


const ItemListContainer = () => {
    const dispatch = useAppDispatch();
    const { data: items, loading, error, page: currentPage, pageSize, token, totalItems, } = useAppSelector((state) => state.list);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(totalItems / pageSize);

    // Функция для изменения размера страницы
    const handlePageSizeChange = (newPageSize: number) => {
        dispatch(setPageSize(newPageSize));
    };

    // Функция для изменения текущей страницы
    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };
    const openEditModal = (itemId: number) => {
        // Логика для открытия модального окна с данными элемента
        
        showModalWithItemData(itemId);
    };

    useEffect(() => {
        // Авторизация и сохранение токена в состоянии
        dispatch(login());
    }, []);
    // Используем useEffect для загрузки данных при инициализации или изменении параметров пагинации
    useEffect(() => {
        dispatch(fetchItems({
            warehouseId: '6aac3263-ca1f-4b4e-8973-3a948873d9de',
            page: currentPage,
            pageSize,
            searchQuery: '',
            sortOrder: 'asc'
        }));
    }, [ currentPage, pageSize]);

    return (
        <div>
            <ItemList items={items} onEdit={openEditModal} />
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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