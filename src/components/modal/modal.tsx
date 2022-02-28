import ReactDOM from "react-dom";
import React, {FC} from "react";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: FC<{header?: string, onClose: ()=>void}> = ({children, header, onClose}) => {
    React.useEffect(() => {
        const onKeyClose = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Esc") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyClose);

        return () => {
            document.removeEventListener("keydown", onKeyClose);
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal}>
                <div className={styles.header}>
                    {header && <p className={styles.headerText}>
                        {header}
                    </p>}
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
}

export default Modal;