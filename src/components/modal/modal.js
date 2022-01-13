import ReactDOM from "react-dom";
import React from "react";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ReactComponent as DoneImg} from '../../images/done.svg'

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
    render() {
        const {children, header} = this.props;
        return ReactDOM.createPortal(
            <ModalOverlay>
                <div className={styles.modal}>
                    <div className={styles.close}>
                        {header && <p className="text text_type_main-large">
                            {header}
                        </p>}
                        <CloseIcon type="primary"/>
                    </div>
                    {children}
                </div>
            </ModalOverlay>,
            modalRoot
        );
    }
}

export default Modal;