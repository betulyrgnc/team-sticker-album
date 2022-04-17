/** Dependencies */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/** Styles*/
import "./button.scss";


const Button = (({ content, className, disabled, onClick, display, color, size, variant}) => {

    const handleClick = (e) => {
        if (disabled) return

        onClick && typeof onClick === "function" && onClick(e);
    }

    const classes = cx(
        "button",
        className, variant && `${variant}`,
        display && `${display}`,
        color && `${color}`,
        size && `${size}`,
    )

    return (
            <button className={classes}
                    disabled={disabled}
                    onClick={handleClick}>
                {content &&
                <div className="button__content">
                    {content}
                </div>}
            </button>
    )
})

export default Button;

Button.propTypes = {
    content: PropTypes.any,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(["default", "primary", "secondary", "danger"]),
    display: PropTypes.oneOf(["xs-none"]),
    size: PropTypes.oneOf(["small", "large"]),
    variant: PropTypes.oneOf(["contained", "text"]),
};



