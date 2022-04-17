/** Dependencies */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/** Stylesheets */
import "./sticker-card.scss";
import closedImg from "../../assets/img/closed.PNG"

export default function StickerCard(props) {
    const {
        className,
        name,
        title,
        image,
        isActive,
        experience,
    } = props;

    return (
        <div className={cx("sticker-card", className)}>
            <div className={cx("sticker-card__img")}>
                {isActive ? <img className="team-member-img" src={image} loading="lazy" alt="team-member-img"/>
                    : <img className="team-member-closed-img" src={closedImg} loading="lazy" alt="team-member-img"/>}
            </div>
            <span className="sticker-card__name">{name}</span>
            <span className="sticker-card__title">{title}</span>
            <span className="sticker-card__term-of-employement">{experience}</span>
        </div>
    );
}

StickerCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    experience: PropTypes.string,
    isActive: PropTypes.bool,
};

StickerCard.defaultProps = {
    className: "",
    experience: "",
    isActive: true,
};
