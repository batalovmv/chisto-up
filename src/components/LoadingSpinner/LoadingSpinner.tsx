
import { ReactNode } from 'react';
import styles from './LoadingSpinner.module.scss'; 

interface LoadingSpinnerProps {
    isLoading: boolean;
    children: ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading, children }) => {
    return (
        <>
            {children}
            {isLoading && (
                <div className={styles.spinnerOverlay}>
                    Loading...
                </div>
            )}
        </>
    );
};

export default LoadingSpinner;
