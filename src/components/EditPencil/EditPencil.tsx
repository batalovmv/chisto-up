import React from 'react';
import styles from './EditPencil.module.css';

type EditPencilProps = {
    onClick: () => void; // Обработчик клика для открытия модального окна
};

const EditPencil: React.FC<EditPencilProps> = ({ onClick }) => {
    return (
        <button className={styles.editButton} onClick={onClick}>
            ✏️
        </button>
    );
};

export default EditPencil;