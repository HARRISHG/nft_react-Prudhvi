import { createSlice } from "@reduxjs/toolkit";

const GetLocalStorageRole = localStorage.getItem("role");
const GetLocalStorageToken = localStorage.getItem("token");
const GetLocalStorageName = localStorage.getItem("name");

let UserAuthInitialState = {
  username: GetLocalStorageName,
  role: GetLocalStorageRole,
  token: GetLocalStorageToken,
};

const UserAuthenticationSlice = createSlice({
  name: "UserAuthentication",
  initialState: UserAuthInitialState,
  reducers: {
    UserLoggedIn: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      console.log("Login Reducer Called");
    },
    UserLoggedOut: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      console.log("Logout Reducer Called");
    },
    default: (state) => state,
  },
});

export const { UserLoggedIn, UserLoggedOut } = UserAuthenticationSlice.actions;
const UserAuthenticationReducer = UserAuthenticationSlice.reducer;
export default UserAuthenticationReducer;
