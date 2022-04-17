import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        showModal: false,

    },
    reducers: {
        setStickerModalVisibility(state, action) {
            state.showModal = action.payload;
        },

    },
});

export const {
    setStickerModalVisibility,

} = globalSlice.actions;

export const selectStickerModalVisibility = state => state.global.showModal;

export default globalSlice.reducer;
