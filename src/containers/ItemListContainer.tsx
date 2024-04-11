import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList/ItemList';
import {  useAppSelector } from '../app/store';
import Header from '../components/Header/Header';
import { Modal } from '../components/Modal/Modal';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { Item } from '../types';
import { usePagination } from '../hooks/usePagination';
import useItemActions from '../hooks/useItemActions';
import PaginationBar from '../components/PaginationBar/PaginationBar';


const ItemListContainer = () => {
    const warehouseId = '6aac3263-ca1f-4b4e-8973-3a948873d9de';

    const { items, loading, sortBy, sortOrder, itemName } = useAppSelector((state) => state.list);
    const { token } = useAppSelector((state) => state.auth);
    const totalItems = useAppSelector((state) => state.list.totalItems);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const { page, pageSize, totalPages, handlePageChange, handlePageSizeChange } = usePagination(totalItems);

    const {
        fetchItemsWithParams,
        handleSort,
        handleSearch,
        handleCreateItem,
        handleEditItem
    } = useItemActions(warehouseId, token);

    useEffect(() => {
        fetchItemsWithParams(itemName, page, pageSize, sortBy, sortOrder);
    }, [page, pageSize, sortBy, sortOrder, itemName, fetchItemsWithParams]);

    const openEditModal = (itemId: number) => {
        const item = items.find(item => item.id === itemId);
        setCurrentItem(item || null);
        setModalOpen(true);
    };

    const addNewItem = () => {
        setCurrentItem(null);
        setModalOpen(true);
    };

    const sortItems = (newSortBy: string) => {
        handleSort(newSortBy, sortBy, sortOrder);
    };

    const searchItems = (searchTerm: string) => {
        handleSearch(searchTerm);
    };

    const handleCreate = (formData: {
        name: string;
        measurement_units?: string;
        code: string;
        description?: string;
    }) => {
        handleCreateItem(formData);
    };

    const handleEdit = (item: Item) => {
        handleEditItem(item);
    };
    return (
        
        <> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} item={currentItem} onEdit={handleEdit}
                onCreate={handleCreate} />
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
           
                <PaginationBar
                    currentPage={page}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onSelectPageSize={handlePageSizeChange}
                />
            </LoadingSpinner>
        </>
    );
};

export default ItemListContainer;