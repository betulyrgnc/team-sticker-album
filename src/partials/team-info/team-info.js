/** Dependencies */
import React from "react";
import PropTypes from "prop-types";

/** Stylesheets */
import "./team-info.scss";

export default function TeamInfo({dataInfo}) {
    const {name, logo, slogan, description, contactInfo} = dataInfo;
    return (
        <div className="team-info">
            <div className="team-info__logo">
                <img src={logo} alt={`${name}-logo`}/>
            </div>
            <div className="team-info__content">
                <h1 className="team-info__name">{name}</h1>
                <h3 className="team-info__slogan">{slogan}</h3>
                <div className="team-info__desc">
                    <p className="team-info__desc-content">{description}</p>
                    <div className="team-info__contact">
                        <span className="team-info__contact-slack">
                          <a href="#">{contactInfo.slack}</a> is our slack channel
                        </span>
                        <span className="team-info__contact-mail">
                          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> is our mail address
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

TeamInfo.propTypes = {
    dataInfo: PropTypes.object.isRequired,
};

