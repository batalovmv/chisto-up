import React from 'react';
import styles from './ItemList.module.scss';
import { Item } from '../../app/list.slice';



type ItemListProps = {
    items: Item[];
    onEdit: (itemId: number) => void;
    onSort: (sortBy: string) => void;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
};

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onSort, sortBy, sortOrder }) => {
    return (
        <div className={styles.itemList}>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onSort('name')}>
                            Название {sortBy === 'name' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                        </th>
                        <th>Единица измерения</th>
                        <th>Артикул/код</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.measurement_units || 'шт'}</td>
                            <td>{item.code || 'нет кода'}</td>
                            <td>
                                <button onClick={() => onEdit(item.id)}>✏️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;