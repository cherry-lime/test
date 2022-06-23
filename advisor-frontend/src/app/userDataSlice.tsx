import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Creates an interface to set the global state variables
 */
export interface UserDataState {
  userID: string;
  userRole: string;
  userName: string;
  userPassword: string;
}
/**
 * Initializes the global state variables
 */
const initialState: UserDataState = {
  userID: "0000",
  userRole: "",
  userName: "",
  userPassword: "",
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
    // Resets the userData back to initial
    resetUser(state) {
      state.userID = initialState.userID;
      state.userRole = initialState.userRole;
    },
    // Save the new userName in the session state
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    // Save the new password in the session state
    setPassword: (state, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserID, setUserRole, resetUser, setUserName, setPassword } =
  userDataSlice.actions;

export default userDataSlice.reducer;
