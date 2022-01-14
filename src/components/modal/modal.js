import ReactDOM from "react-dom";
import React from "react";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, header, onClose}) => {
    const onKeyClose = (e) => {
        if (e.key === "Escape" || e.key === "Esc")
        {
            onClose(e);
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", onKeyClose);

        return () => {
            document.removeEventListener("keydown", onKeyClose);
        }
    }, [])

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    {header && <p className={styles.headerText}>
                        {header}
                    </p>}
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;