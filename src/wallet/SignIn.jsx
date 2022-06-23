import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  WalletLoggedIn,
  WalletLoggedOut,
} from "../store/WalletAuthenticationReducer";

const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

function DemoNav() {
  const [web3auth, setWeb3auth] = useState(null);
  const [ConnectionProvider, setConnectionProvider] = useState(null);

  const dispatch = useDispatch();
  const Wallet = useSelector((state) => state.wallet);

  const Init = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x4",
          rpcTarget:
            "https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380",
        },
        // uiConfig: {
        //   appLogo: "https://images.web3auth.io/web3auth-logo-w.svg",
        //   theme: "light",
        //   loginMethodsOrder: ["facebook", "google"],
        // },
      });

      setWeb3auth(web3auth); //Initialize Web3Auth
      await web3auth.initModal(); //Initialize Modal
      // setWeb3AuthModal(Model); //Set Modal in UseState for Subscribing Events
    } catch (error) {
      console.error(error);
    }
  };

  const WalletSignIn = async () => {
    try {
      const Provider = await web3auth.connect(); //Connect to Wallet
      setConnectionProvider(Provider); //Set Provider

      const User = await web3auth.getUserInfo();
      //Local Storage
      localStorage.setItem("email", User.email);
      localStorage.setItem("name", User.name);
      localStorage.setItem("VerifierId", User.verifierId);

      //Dispatching Action
      dispatch({
        type: WalletLoggedIn,
        payload: {
          email: User.email,
          name: User.name,
          VerifierId: User.verifierId,
        },
      });
    } catch (err) {
      console.log(err);
    }
    //const torusEvmAdapter = new TorusWalletAdapter({});
    // setProvider("whats is this", web3authProvider);
  };

  const WalletSignOut = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      //Local Storage
      localStorage.setItem("email", "");
      localStorage.setItem("name", "");
      localStorage.setItem("VerifierId", "");

      //Dispatching Action
      dispatch({
        type: WalletLoggedOut,
        payload: {
          email: "",
          name: "",
          VerifierId: "",
        },
      });
    } catch (err) {
      console.log("Wallet Not Connected");
      //console.log(err);
    }
  };

  const GetUserInfo = async () => {
    try {
      const User = await web3auth.getUserInfo();
      //Local Storage
      localStorage.setItem("email", User.email);
      localStorage.setItem("name", User.name);
      localStorage.setItem("VerifierId", User.verifierId);

      //Dispatching Action
      dispatch({
        type: WalletLoggedIn,
        payload: {
          email: User.email,
          name: User.name,
          VerifierId: User.verifierId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const GetUserAccount = async () => {
  //   try {
  //     const web3 = new Web3(ConnectionProvider);
  //     return await web3.eth.getAccounts();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    Init();
  }, []);

  return (
    <div className="d-flex">
      <button className="btn btn-success" onClick={WalletSignIn}>
        SignIn
      </button>
      <button className="btn btn-dark" onClick={WalletSignOut}>
        SignOut
      </button>
      {Wallet.name}
    </div>
  );
}

export default DemoNav;
