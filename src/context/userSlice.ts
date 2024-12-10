import { ReduxAppState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReduxUserState = {
  id: number | null;
  auth_user_id: string | null;
  full_name: string | null;
  email: string | null;
  isUserAdmin: boolean;
};

const initialState: ReduxUserState = {
  id: null,
  auth_user_id: null,
  full_name: null,
  email: null,
  isUserAdmin: false,
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
      state.isUserAdmin = action.payload.isUserAdmin;
    },
    setIsUserAdmin: (state, action: PayloadAction<boolean>) => {
      state.isUserAdmin = action.payload;
    },
  },
});

export const { setCurrentUser, setIsUserAdmin } = userSlice.actions;

export default userSlice.reducer;

export const getCurrentReduxUser = () => (state: ReduxAppState) => {
  return state.user;
};
