import { createSlice } from "@reduxjs/toolkit";

const WalletAuthInitialState = {
  account: "",
  IsLoggedIn: "",
};

const WalletAuthSlice = createSlice({
  name: "WalletAuthentication",
  initialState: WalletAuthInitialState,
  reducers: {
    WalletLoggedIn: (state, action) => {
      state.account = action.payload.account;
      state.IsLoggedIn = action.payload.IsLoggedIn;
      console.log("Wallet Login Reducer Called");
    },
    WalletLoggedOut: (state, action) => {
      state.account = action.payload.account;
      state.IsLoggedIn = action.payload.IsLoggedIn;
      console.log("Wallet Logout Reducer Called");
    },
    DefaultState: (state, action) => {
      state.account = action.payload.account;
      state.IsLoggedIn = action.payload.IsLoggedIn;
      console.log("Wallet Default Reducer Called");
    },
    default: (state) => state,
  },
});

export const { WalletLoggedIn, WalletLoggedOut, DefaultState } =
  WalletAuthSlice.actions;
const WalletAuthenticationReducer = WalletAuthSlice.reducer;
export default WalletAuthenticationReducer;
