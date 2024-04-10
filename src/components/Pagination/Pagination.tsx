import React from 'react';
import styles from './SelectPageSize.module.scss';

type SelectPageSizeProps = {
    options: number[];
    selectedOption: number;
    onSelect: (number: number) => void;
};

const SelectPageSize: React.FC<SelectPageSizeProps> = ({ options, selectedOption, onSelect }) => {
    return (
        <div className={styles.selectPageSize}>
            <select
                value={selectedOption}
                onChange={(e) => onSelect(parseInt(e.target.value))}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        Показать {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectPageSize;