/** Dependencies */
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

/** Slices */
import {selectStickerModalVisibility, setStickerModalVisibility} from "../../store/global/globalSlice";
import {selectAllTeams} from "../../store/team/teamSlice";

/** Components */
import Button from "../../components/button/button";

/** Partials */
import StickerModal from "../../partials/sticker-modal/sticker-modal";

/** Styles */
import "./home-page.scss";
import logo from "../../assets/img/trendyol-tech-logo.PNG";

export default function HomePage() {
    const dispatch = useDispatch();
    const stickerModal = useSelector(selectStickerModalVisibility);
    const allTeams = useSelector(selectAllTeams);
    const firstTeam = allTeams[0];

    const onDailyStickersClick = () => {
        dispatch(setStickerModalVisibility(!stickerModal));
    };

    return (
        <div className="home-page">
            <div className="home-page__content">
                <img src={logo} alt="trendyol tech" />
                <span>Sticker Album</span>
            </div>
            <div className="home-page__next-button">
                <Link to={`/${firstTeam.id}/${firstTeam.slug}`} style={{ textDecoration: 'none' }}>
                    <Button content={"Next Page"}/>
                </Link>
            </div>
            <div className="home-page__sticker-button">
                <Button content={"GET YOUR DAILY STICKERS "}
                        onClick={onDailyStickersClick}/>
            </div>
            <StickerModal />
        </div>
    )
}
