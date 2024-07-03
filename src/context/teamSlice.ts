import { createSlice } from "@reduxjs/toolkit";
import { AppState, TeamState } from "../types/types";

const initialState: TeamState = {
  selectedTeam: 1,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
  },
});

export const { setSelectedTeam } = teamSlice.actions;

export default teamSlice.reducer;

export const getSelectedTeam = () => (state: AppState) => {
  return state.team.selectedTeam;
};
