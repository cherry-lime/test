import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "../types/UserRole";

/**
 * Creates an interface to set the global state variables
 */
export interface UserDataState {
  userId: string;
  userRole: UserRole;
}
/**
 * Initializes the global state variables
 */
const initialState: UserDataState = {
  userId: "0000",
  userRole: "ASSESSOR",
};

/**
 * Redux Toolkit based state manager that handles the state manipulation
 */
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Sets the userID in the global state variable with the supplied variable
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    // Sets the current userRole in the global state variable with the supplied variable
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserId, setUserRole } = userDataSlice.actions;

export default userDataSlice.reducer;
