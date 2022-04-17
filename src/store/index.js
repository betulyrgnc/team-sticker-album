import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import globalSlice from "./global/globalSlice";
import teamSlice from "./team/teamSlice";
import stickerSlice from "./sticker/stickerSlice";

const reducer = combineReducers({
    global: globalSlice,
    teamState : teamSlice,
    stickerState: stickerSlice
});

const store = configureStore({
    reducer,
    devTools: true,
});
export default store;
