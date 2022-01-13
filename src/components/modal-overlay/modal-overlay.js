import React from "react";
import styles from './modal-overlay.module.css'

const ModalOverlay = (props) => {
    const { children } = props;

    return (
        <section className={styles.overlay}>
            {children}
        </section>
    )
}

export default ModalOverlay;