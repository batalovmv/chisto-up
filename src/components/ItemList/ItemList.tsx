import React from 'react';
import styles from './ItemList.module.scss';

type Item = {
    id: number;
    name: string;
    unit: string;
    sku: string;
};


type ItemListProps = {
    items: Item[];
    onEdit: (itemId: number) => void; 
};

const ItemList: React.FC<ItemListProps> = ({ items, onEdit }) => {
    return (
        <div className={styles.itemList}>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Единица измерения</th>
                        <th>Артикул</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.unit}</td>
                            <td>{item.sku}</td>
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