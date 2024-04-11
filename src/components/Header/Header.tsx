import React, { useState } from 'react';
import styles from './Header.module.scss';
interface HeaderProps {
    title: string;
    itemCount: number;
    onSearch: (searchTerm: string) => void;
    onAddNewItem: () => void;
}
const Header: React.FC<HeaderProps> = ({ title, itemCount, onSearch, onAddNewItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1>{title} <span>{itemCount} единиц</span></h1>
            </div>
            <div className={styles.right}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Поиск..."
                        className={styles.searchInput}
                    />
                    <button onClick={() => onSearch(searchTerm)} className={styles.searchButton}>
                        Поиск
                    </button>
                </div>
                <button onClick={onAddNewItem} className={styles.addButton}>
                    + Новая позиция
                </button>
            </div>
        </header>
    );
};

export default Header;
