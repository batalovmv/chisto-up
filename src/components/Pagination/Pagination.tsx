import React from 'react';
import styles from './Pagination.module.scss';
import arrowSvg from '../../assets/arr.svg';
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={styles.pagination}>
            {pages.map((page) => (
                <button
                    key={page}
                    className={currentPage === page ? styles.active : ''}
                    disabled={currentPage === page}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button className={styles.svg} onClick={() => onPageChange(currentPage + 1)}> <img src={arrowSvg} alt="Next" /></button>
            )}
        </div>
    );
};

export default Pagination;