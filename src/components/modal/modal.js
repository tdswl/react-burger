import ReactDOM from "react-dom";
import React from "react";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {Button, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import IngredientDetailParam from "../ingredient-details-param/ingredient-details-param";

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
    // Устанавливаем слушатель события при монтировании
    componentDidMount() {
        document.addEventListener("keydown", this.props.onClose);
    }

    // Сбрасываем слушатель события при удалении компонента из DOM
    componentWillUnmount() {
        document.removeEventListener("keydown", this.props.onClose, );
    }

    render() {
        const {children, header, onClose} = this.props;

        return ReactDOM.createPortal(
            <ModalOverlay onClose={onClose}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        {header && <p className="text text_type_main-large">
                            {header}
                        </p>}
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </ModalOverlay>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;