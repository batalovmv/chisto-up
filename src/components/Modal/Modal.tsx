import { ChangeEvent, FormEvent, useState } from "react";
import { Item } from "../../app/list.slice";
import styles from './Modal.module.scss';
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
    // If the modal isn't open, don't render anything
    if (!isOpen) return null;

    // Define the type for the form data state
    type FormData = {
        name: string;
        measurement_units: string;
        code: string;
        description: string; // Added field for description
    };

    // Initialize form fields state with the item data or empty for a new item
    const [formData, setFormData] = useState<FormData>({
        name: item?.name || '',
        measurement_units: item?.measurement_units || 'шт',
        code: item?.code || '',
        description: item?.description || '', // Initialize description
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent the default form submit action
        // Handle form submission for both adding and editing
        if (item) {
            // Edit item logic
        } else {
            // Add new item logic
        }
        onClose(); // Close the modal after submission
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <h2 className={styles.header}>{item ? formData.name : 'новая позиция'}</h2>
                <form onSubmit={handleSubmit}>

                    {!item && (
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Название</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="measurement_units" className={styles.label}>Единицы измерения</label>
                        <input
                            type="text"
                            id="measurement_units"
                            name="measurement_units"
                            value={formData.measurement_units}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="code" className={styles.label}>Код</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={styles.textarea}
                        />
                    </div>

                    <button type="submit" className={styles.saveButton}>Save</button>
                </form>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" className={styles.saveButton}>Confirm</button>
                </div>
            </div>
        </div>
    );

};
