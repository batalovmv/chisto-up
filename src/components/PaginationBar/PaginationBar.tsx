import React from 'react';
import Pagination from '../Pagination/Pagination';
import SelectPageSize from '../SelectPageSize/SelectPageSize';
import styles from './PaginationBar.module.scss';


type PaginationAndSizeSelectorProps = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onSelectPageSize: (size: number) => void;
};

const PaginationBar: React.FC<PaginationAndSizeSelectorProps> = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onSelectPageSize,
}) => {
    return (
        <div className={styles.container}>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
            <SelectPageSize
                options={[5, 10, 20, 50]}
                selectedOption={pageSize}
                onSelect={onSelectPageSize}
            />
        </div>
    );
};

export default PaginationBar;
