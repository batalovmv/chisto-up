import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList/ItemList';
import Pagination from '../components/Pagination/Pagination';
import SelectPageSize from '../components/SelectPageSize/SelectPageSize';
import { useAppDispatch, useAppSelector } from '../app/store';
import {  Item, fetchItems,  fetchItemsByName,  setPage, setPageSize,  setSortBy, setSortOrder } from '../app/list.slice';
import useAuthToken from '../hooks/useAuthToken';
import Header from '../components/Header/Header';
import { Modal } from '../components/Modal/Modal';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';


const ItemListContainer = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, page, pageSize, totalItems, sortBy, sortOrder } = useAppSelector((state) => state.list);
    const { token } = useAppSelector((state) => state.auth);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
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
        
            dispatch(setPage(1));//пока поставил всегда переходить на первую страницу
        
       
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

   
    const showModalWithItemData = (itemId: number) => {
        console.log('Showing modal for item:', itemId);
       console.log(`items`, items);
    };

    const openEditModal = (itemId: number) => {
      
        const item = items.find(item => item.id === itemId);
        setCurrentItem(item || null); 
        setModalOpen(true); 
    };
    const totalPages = Math.ceil(totalItems / pageSize);

   

    const addNewItem = () => {
        setCurrentItem(null); 
        setModalOpen(true); 
    };
    const sortItems = (newSortBy: string) => {//посчитал что не нужно возвращаться к 1 странице при сортировке , но иногда добавляют обновление страницы до первой, тут по желанию
        const newSortOrder = sortBy === newSortBy && sortOrder === 'ASC' ? 'DESC' : 'ASC';
        dispatch(setSortBy(newSortBy));
        dispatch(setSortOrder(newSortOrder));
        dispatch(fetchItems({
            warehouseId: '6aac3263-ca1f-4b4e-8973-3a948873d9de',
            page: page,
            pageSize: pageSize,
            token: token,
            sortBy: newSortBy,
            sortOrder: newSortOrder,
        }));
    };

    // Функция для поиска элементов
    const searchItems = (searchTerm: string) => {
        dispatch(setPage(1)); 
        dispatch(fetchItemsByName({
            searchTerm: searchTerm,
            token: token, 
        }));
    };
 
    return (
        
        <> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} item={currentItem} />
            <LoadingSpinner isLoading={loading}>
            <Header
                title="Номенклатура"
                itemCount={totalItems}
                onSearch={searchItems}
                onAddNewItem={addNewItem}
            />
           
                <ItemList
                    items={items}
                    onEdit={openEditModal}
                    onSort={sortItems}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                />
           
            <div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange = { handlePageChange }
                        />
                        <SelectPageSize
                            options={[5, 10, 20, 50]}
                            selectedOption={pageSize}
                            onSelect={handlePageSizeChange}
                        />
            </div>
            </LoadingSpinner>
        </>
    );
};

export default ItemListContainer;