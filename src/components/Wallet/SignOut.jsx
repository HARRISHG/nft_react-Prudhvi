import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import { WalletLoggedOut } from "./../../store/WalletAuthenticationReducer";
import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";

const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useMoralis();
  const {
    // authenticate,
    // isAuthenticated,
    // isAuthenticating,
    // user,
    // account,
    logout,
  } = useMoralis();

  const WebAuthSignOut = async () => {
    try {
      await logout();

      //Dispatching Action
      dispatch({
        type: WalletLoggedOut,
        payload: {
          account: "",
          IsLoggedIn: isAuthenticated,
        },
      });

      console.log("logged out");
      navigate("/");
    } catch (err) {
      console.log("Wallet Not Connected");
      console.log(err);
    }
  };

  return (
    <button className="dropdown-item" onClick={WebAuthSignOut}>
      SignOut
    </button>
  );
}

export default SignOut;
