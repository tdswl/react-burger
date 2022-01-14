import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClose}) => {
    const onOverlayClick = (e) => {
        // Это позволяет вызываеть метод только по оверлею, а не по всем его дочерним элементам
        if (e.target === e.currentTarget)
        {
            onClose(e);
        }
    };

    return (
        <section className={styles.overlay} onClick={onOverlayClick}>
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;