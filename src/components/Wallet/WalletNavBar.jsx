import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { DefaultState } from "./../../store/WalletAuthenticationReducer";

function NavBarNew() {
  const WebAuthUser = useSelector((state) => state.wallet);
  const { isInitialized, Moralis, isAuthenticated } = useMoralis();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialized) {
      GetUserAccount();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      GetUserAccount();
    }
  }, []);

  const GetUserAccount = async () => {
    const currentUser = Moralis.User.current();
    if (currentUser) {
      const user_account = await currentUser.get("ethAddress");
      console.log("Get User Account Called");
      dispatch({
        type: DefaultState,
        payload: {
          account: user_account,
          IsLoggedIn: isAuthenticated,
        },
      });
    } else {
      console.log("User Not Logged In");
      // show the signup or login page
    }
  };

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
          {WebAuthUser.account ? (
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
                    {WebAuthUser.account}
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
