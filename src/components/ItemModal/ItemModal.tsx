import React from 'react';
import styles from './ItemModal.module.scss';

type ItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {/* Содержимое модального окна */}
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ItemModal;