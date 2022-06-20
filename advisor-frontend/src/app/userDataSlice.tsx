import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userTypes from "../components/Sidebar/listUsersTypes";

export interface UserDataState {
  value: number;
  userID: string;
  userRole: string
}

const initialState: UserDataState = {
  value: 0,
  userID: "0000",
  userRole: "user"
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {

    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUserID, setUserRole } = userDataSlice.actions;

export default userDataSlice.reducer;
