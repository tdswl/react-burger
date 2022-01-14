import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClose}) => {
    return (
        <section className={styles.overlay} onClick={onClose}>
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;