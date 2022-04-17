/** Dependencies */
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

/** Slices */
import {
    addDailySticker,
    getRandomTeamMembersAsync,
    selectRandomTeamMembers,
    selectDailySticker, pasteDailySticker,
} from "../../store/sticker/stickerSlice";

import {
    updateAllMembers,
    selectAllTeamMembers
} from "../../store/team/teamSlice";

/** Components */
import Button from "../../components/button/button";

/** Partials */
import StickerCard from "../sticker-card/sticker-card";

/** Constants */
import {DAILY_STICKER_OPEN_RIGHT_PER_DAY, STICKER_SET_COUNT} from "../../store/sticker/stickerConstants";

/** Styles */
import "./sticker-set.scss";
import logo from "../../assets/img/trendyol-tech-logo.PNG";

export default function StickerSet({className}) {
    const dispatch = useDispatch();
    const randomTeamMembers = useSelector(selectRandomTeamMembers);
    const dailyStickers = useSelector(selectDailySticker);
    const allTeamMembers = useSelector(selectAllTeamMembers);

    const [paste, setPaste] = useState(false)

    const currentDate = new Date().toLocaleDateString()
    const dailyStickerBelongsToDay = dailyStickers[currentDate]
    const remainingSticker = (DAILY_STICKER_OPEN_RIGHT_PER_DAY - ((dailyStickerBelongsToDay?.length || 0) / STICKER_SET_COUNT))

    useEffect(() => {
        if (!randomTeamMembers.length) {
            return
        }

        dispatch(addDailySticker({
            randomTeamMembers,
            date: currentDate
        }))
    }, [randomTeamMembers])

    const openStickerSetClick = async () => {
        dispatch(getRandomTeamMembersAsync())
    };

    const applyStickers = () =>{
        const pastedMembers = dailyStickerBelongsToDay.map((item) => {
            return {
                ...item,
                isActive: true
            }
        })

        dispatch(pasteDailySticker({
            pastedMembers,
            date: currentDate,
        }))
    }

    const applyStickersToMembers = () =>{
        const dailyStickerIdsBelongsToDay = dailyStickerBelongsToDay.map(item => item.id)

        const pastedAllTeamMembers = allTeamMembers.map((member) => {
            const newMember = {
                ...member
            }
            if (dailyStickerIdsBelongsToDay.includes(newMember.id)) {
                newMember.isActive = true
            }
            return newMember

        })

        dispatch(updateAllMembers(pastedAllTeamMembers))
    }

    const onPasteButtonClick = () => {
        setPaste(true)
        applyStickers()
        applyStickersToMembers()
    }

    return (
        <div className={cx("sticker-set", className)}>
            <h3 className="sticker-set__info">
                Sticker set has opened you have {Math.max(remainingSticker, 0)} new stickers
            </h3>
            <>
                {
                    remainingSticker ?
                        <div className="sticker-set__stickers">
                            {Array.from({length: remainingSticker})?.map((item, index) => (
                                <div className="sticker-set__stickers__item" key={index}>
                                    <div className="sticker-set__stickers__item-content">
                                        <img className="sticker-set-img" src={logo}
                                             style={{minWidth: "50px", height: "70px"}}/>
                                        <span className="sticker-set-title">SET STICKER</span>
                                    </div>
                                    <Button
                                        className={"sticker-set__open-button"}
                                        content={"OPEN"}
                                        onClick={() => openStickerSetClick()}
                                    />

                                </div>
                            ))}
                        </div> :
                        <>
                            <div className="sticker-set__members">
                                {dailyStickerBelongsToDay?.map((item, index) => (
                                    <StickerCard
                                        key={index}
                                        image={item.image}
                                        name={item.name}
                                        title={item.title}
                                    />
                                ))}
                            </div>
                            <Button
                                className={"sticker-list__paste-button"}
                                content={"PASTE TO YOUR ALBUM "}
                                disabled={paste}
                                onClick={() => onPasteButtonClick()}
                            />
                        </>
                }
            </>
        </div>
    );
};

StickerSet.propTypes = {
    className: PropTypes.string.isRequired,
};

StickerSet.defaultProps = {
    className: "",
};
