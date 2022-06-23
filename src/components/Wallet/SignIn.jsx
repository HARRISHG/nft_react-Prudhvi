import { useDispatch } from "react-redux";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { WalletLoggedIn } from "./../../store/WalletAuthenticationReducer";

const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

function SignIn() {
  const dispatch = useDispatch();
  const { authenticate, isAuthenticated, user } = useMoralis();

  const WebAuthSignIn = async () => {
    try {
      if (!isAuthenticated) {
        await authenticate({
          provider: "web3Auth",
          clientId: clientId,
          chainId: "0x4",
          //rpcTarget:"https://rinkeby.infura.io/v3/926a74ce9c2c48ecab5133c69cc87b4f",
          // chainConfig: {
          //   chainNamespace: CHAIN_NAMESPACES.EIP155,
          //   chainId: "0x4",
          //   rpcTarget:
          //     "https://rinkeby.infura.io/v3/926a74ce9c2c48ecab5133c69cc87b4f",
          // },
        })
          .then(function (user) {
            //Dispatching Action
            const user_account = user.get("ethAddress");
            dispatch({
              type: WalletLoggedIn,
              payload: {
                account: user_account,
                IsLoggedIn: isAuthenticated,
              },
            });
          })
          .catch((error) => console.log(error));
      } else {
        const user_account = user.get("ethAddress");
        dispatch({
          type: WalletLoggedIn,
          payload: {
            account: user_account,
            IsLoggedIn: isAuthenticated,
          },
        });
      }
    } catch {
      console.log(console.log());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div>
      <button className="btn btn-warning" onClick={WebAuthSignIn}>
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
