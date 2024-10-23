import { ReduxAppState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReduxUserState = {
  id: number | null;
  auth_user_id: string | null;
  full_name: string | null;
  email: string | null;
  user_role: "player" | "admin";
};

const initialState: ReduxUserState = {
  id: null,
  auth_user_id: null,
  full_name: null,
  email: null,
  user_role: "player",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ReduxUserState>) => {
      state.id = action.payload.id;
      state.auth_user_id = action.payload.auth_user_id;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.user_role = action.payload.user_role;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const getCurrentReduxUser = () => (state: ReduxAppState) => {
  return state.user;
};
