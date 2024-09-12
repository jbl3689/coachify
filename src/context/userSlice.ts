import { ReduxAppState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReduxUserState = {
  id: number | null;
  auth_user_id?: string;
  full_name?: string;
  email?: string;
};

const initialState: ReduxUserState = {
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ReduxUserState>) => {
      state.id = action.payload.id ?? state.id;
      state.auth_user_id = action.payload.auth_user_id ?? state.auth_user_id;
      state.full_name = action.payload.full_name ?? state.full_name;
      state.email = action.payload.email ?? state.email;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const getCurrentUser = () => (state: ReduxAppState) => {
  return state.user;
};
