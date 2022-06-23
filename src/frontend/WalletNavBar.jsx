import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useEffect, useState } from "react";

import {
  WalletLoggedIn,
  WalletLoggedOut,
} from "../store/WalletAuthenticationReducer";
import { WalletInitiated, WalletDisconnected } from "../store/Web3InitReducer";
import SignIn from "../components/Wallet/SignIn";
import SignOut from "../components/Wallet/SignOut";

const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

function NavBarNew() {
  const [Provider, SetProvider] = useState(null);
  const [Web3Init, Setweb3auth] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const WebAuthUser = useSelector((state) => state.wallet);

  return (
    <nav className="navbar navbar-expand-lg nav_background text-white sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex" to="/">
          <img
            src={window.location.origin + "/images/princess_logo.svg"}
            alt="Logo"
          ></img>
        </Link>
        <div>
          {WebAuthUser.name ? (
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    to="#"
                  >
                    {WebAuthUser.name}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/user-dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <SignOut />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarNew;
