import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            {/* навигационное меню */}
            <nav>
                <ul>
                    <li>Главная</li>
                    {/* Остальные пункты меню */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;