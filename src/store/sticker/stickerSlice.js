import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import {fetchRandomTeamMembers} from "./stickerApi";

const initialState = {
    randomTeamMembers: [],
    dailySticker: {},
};

export const getRandomTeamMembersAsync = createAsyncThunk(
    'team/fetchRamdomTeamMembers',
    async (length) => {
        return await fetchRandomTeamMembers(length);
    }
);

export const stickerSlice = createSlice({
    name: 'stickerState',
    initialState,
    reducers: {
        addDailySticker: (state, action) => {
            const {date, randomTeamMembers } = action.payload

            if(!current(state).dailySticker[date]){
                state.dailySticker[date] = []
            }
            state.dailySticker[date].push(...randomTeamMembers)

        },
        pasteDailySticker: (state, action) => {
            const {date,pastedMembers } = action.payload
            state.dailySticker[date] = pastedMembers

        },

    },
    extraReducers: {
        [getRandomTeamMembersAsync.fulfilled]: (state, action) => {
            state.randomTeamMembers = action.payload;
        },

    },
});
export const {addDailySticker, pasteDailySticker} = stickerSlice.actions;

export const selectRandomTeamMembers = state => state.stickerState.randomTeamMembers;
export const selectDailySticker = state => state.stickerState.dailySticker;

export default stickerSlice.reducer;
