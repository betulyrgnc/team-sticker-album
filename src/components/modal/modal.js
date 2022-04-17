/** Dependencies */
import React from "react";
import cx from "classnames";

/** Components */
import Button from "../button/button";

/** Styles */
import "./modal.scss";

export default function Modal({title, content, children, footer, className, onClose}) {

    const handleClose = () => onClose && onClose()

    return (
        <div className={cx("modal", className)}>
            <div className="modal__overlay" onClick={handleClose}/>
            <div className="modal__inner">
                <div className="modal__header">
                    <div className="modal__header__title">
                        <h3>{title}</h3>
                    </div>
                    <Button content={"X"} size={"small"}
                            onClick={handleClose}/>
                </div>

                <div className="modal__content">
                    {children || content}
                </div>

                {footer &&
                <div className="modal__footer">{footer}</div>}
            </div>
        </div>
    )
}
