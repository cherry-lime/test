import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Creates an interface to set the global state variables
 */
export interface UserDataState {
  userID: string;
  userRole: string;
}
/**
 * Initializes the global state variables
 */
const initialState: UserDataState = {
  userID: "0000",
  userRole: "user",
};

/**
 * Redux Toolkit based state manager that handles the state manipulation
 */
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Sets the userID in the global state variable with the supplied variable
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    // Sets the current userRole in the global state variable with the supplied variable
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserID, setUserRole } = userDataSlice.actions;

export default userDataSlice.reducer;
