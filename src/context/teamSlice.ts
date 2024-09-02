import { ReduxAppState, ReduxTeamState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ReduxTeamState = {
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

export const getSelectedTeam = () => (state: ReduxAppState) => {
  return state.team.selectedTeam;
};
