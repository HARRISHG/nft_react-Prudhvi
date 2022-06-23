import { configureStore } from "@reduxjs/toolkit";
import UserAuthenticationReducer from "./UserAuthenticationReducer";
import WalletAuthenticationReducer from "./WalletAuthenticationReducer";

let store = configureStore({
  reducer: {
    user: UserAuthenticationReducer,
    wallet: WalletAuthenticationReducer,
  },
  devTools: true,
});

export default store;
