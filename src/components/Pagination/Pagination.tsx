import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Создание массива номеров страниц для рендеринга
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={styles.pagination}>
            {/* Кнопки пагинации */}
            {pages.map((page) => (
                <button
                    key={page}
                    disabled={currentPage === page}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>→</button>
            )}
        </div>
    );
};

export default Pagination;