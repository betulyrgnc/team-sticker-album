/** Dependencies */
import React from "react";
import {useDispatch, useSelector} from "react-redux";

/** Slices */
import {selectStickerModalVisibility, setStickerModalVisibility} from "../../store/global/globalSlice";

/** Components */
import Modal from "../../components/modal/modal";

/** Partials */
import StickerSet from "../sticker-set/sticker-set";

export default function StickerModal() {
    const showModal = useSelector(selectStickerModalVisibility)
    const dispatch = useDispatch()

    const closeStickerModal = () => dispatch(setStickerModalVisibility(false))

    return (
        showModal &&
        <Modal className={"sticker-modal"}
               title={"DAILY STICKER SETS"}
               onClose={closeStickerModal}>
            <div className={"sticker"}>
                <div className={"sticker__content"}>
                    <StickerSet/>
                </div>
            </div>
        </Modal>
    )
}
