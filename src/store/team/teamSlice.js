import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';

import {fetchTeam, fetchTeamMembers, fetchTeams} from "./teamApi";

const initialState = {
    allTeams: fetchTeams(),
    allTeamMembers: fetchTeamMembers(),
    currentTeam: {},
    previousTeam: null,
    nextTeam: null,
    currentTeamMembers: null,
};

export const getTeamAsync = createAsyncThunk(
    'team/fetchTeam',
    async (id) => {
        return await fetchTeam(id);
    }
);

export const getTeamWithPrevAndNextAsync = createAsyncThunk(
    'team/fetchTeam',
    async (id) => {
        return {
            currentTeam: await fetchTeam(id),
            previousTeam: await fetchTeam(id - 1),
            nextTeam: await fetchTeam(id + 1),
        };
    }
);

export const teamSlice = createSlice({
    name: 'teamState',
    initialState,
    reducers: {
        updateAllMembers: (state, action) => {
            state.allTeamMembers = action.payload
        },
        getCurrentTeamMembers: (state,action) => {
            state.currentTeamMembers =  current(state).allTeamMembers?.filter(member => member.teamId === +action.payload);
        }

    },
    extraReducers: {
        [getTeamAsync.fulfilled]: (state, action) => {
            state.currentTeam = action.payload;
        },
        [getTeamWithPrevAndNextAsync.fulfilled]: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
});

export const {updateAllMembers,getCurrentTeamMembers} = teamSlice.actions;

export const selectAllTeams = state => state.teamState.allTeams;
export const selectAllTeamMembers = state => state.teamState.allTeamMembers;
export const selectCurrentTeam = state => state.teamState.currentTeam;
export const selectPreviousTeam = state => state.teamState.previousTeam;
export const selectNextTeam = state => state.teamState.nextTeam;
export const selectCurrentTeamMembers = state => state.teamState.currentTeamMembers;

export default teamSlice.reducer;
