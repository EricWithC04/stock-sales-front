import styles from './EmptyAlert.module.css';

const EmptyAlert = () => {
    return (
        <div className={styles.notice}>
            <span className={styles.icon}>⚠️</span>
            <span>No hay productos disponibles en esta categoría categoría.</span>
        </div>
    );
};

export default EmptyAlert;
