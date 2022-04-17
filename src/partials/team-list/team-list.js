/** Dependencies */
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

/** Components */
import Button from "../../components/button/button";

/** Partials */
import StickerCard from "../sticker-card/sticker-card";

/** Stylesheets */
import "./team-list.scss";


export default function TeamList({className, grid, teamMembers}) {
    if (!teamMembers) return null

    const classes = cx(
        "team-list",
        className, grid && `${grid}`,
    )

    return (
        <div className={classes}>
            <div className="team-member-list__items">
                {teamMembers.map((member, index) => (
                    <StickerCard
                        className="team-member-list__item"
                        key={index}
                        name={member.name}
                        title={member.title}
                        image={member.image}
                        isActive={member.isActive}
                        experience={member.experience}
                    />
                ))}
            </div>
        </div>
    );
}

Button.propTypes = {
    grid: PropTypes.oneOf(["first", "second"]),
};