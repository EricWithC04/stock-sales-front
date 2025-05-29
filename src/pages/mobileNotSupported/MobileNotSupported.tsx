import styles from './MobileNotSupported.module.css';

export const MobileNotSupported = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.icon}>📵</div>
                <h1 className={styles.title}>Aplicación no disponible en dispositivos móviles</h1>
                <p className={styles.description}>
                    Por el momento esta aplicación está diseñada para pantallas más grandes.
                    Por favor accedé desde un dispositivo con una pantalla horizontal o de escritorio.
                </p>
            </div>
        </div>
    );
};