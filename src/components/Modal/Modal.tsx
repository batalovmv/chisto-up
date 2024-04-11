import { ChangeEvent, FormEvent, useState } from "react";
import styles from './Modal.module.scss';
import { Item } from "../../types";
import exitSvg from '../../assets/exit.svg';
import homeSvg from '../../assets/home.svg';
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null;
    onCreate: (formData: { name: string; measurement_units: string; code: string; description: string; }) => void; 
    onEdit: (data: Item) => void;
};
type FormData = {
    name: string;
    measurement_units: string;
    code: string;
    description: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item, onCreate, onEdit }) => {
    if (!isOpen) return null;
    const initialFormData = {
        name: item?.name || '',
        measurement_units: item?.measurement_units || 'шт',
        code: item?.code || '',
        description: item?.description || '',
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (item) {
            onEdit({ ...formData, id: item.id }); 
        } else {
           onCreate(formData); 
        }
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                    <div className={styles.buttonsBar}>
                        <button className={styles.homeButton}><img src={homeSvg} alt="home" /></button>
                        <button onClick={onClose} className={styles.closeButton}><img src={exitSvg} alt="exit" /></button>
                </div>
               
                <div>
                    <h2 className={styles.header}>{item ? formData.name : 'Новая позиция '}</h2>
                    <span className={styles.headerTitle}>{item ? 'Заполните все поля для изменения номенклатуры' : 'Заполните все поля для создания новой номенклатуры '}</span>
                </div>
                
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

                    
                </form>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>Отмена</button>
                    <button type="submit" onClick={handleSubmit} className={styles.saveButton}>Подтвердить</button>
                </div>
            </div>
        </div>
        </div>
    );

};
