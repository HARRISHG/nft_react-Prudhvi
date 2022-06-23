import { useEffect, useState } from "react";
import { GetUserNftsNew, UserLoggedIn } from "../../nft";
import NftCardNew from "../../components/NftCardNew";
import { useNavigate } from "react-router";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function MarketPlaceNew() {
  const UserAuthStatus = useSelector((state) => state);
  const navigate = useNavigate();
  const SignOut = () => {
    sessionStorage.setItem("auth", "");
    navigate("/login");
  };

  const MetamaskSignIn = async () => {
    if (typeof window.ethereum === "undefined") {
      return console.log("MetaMask is not installed!");
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
    }
  };

  return (
    <div>
      {/*Profile Stripe Start*/}
      <div
        style={{ position: "relative", top: "10vh" }}
        className="profile_stripe_background"
      >
        <div className="container">
          <img
            src={window.location.origin + "/images/profile_img.jpg"}
            alt="Profile"
            className="profile_image"
          ></img>

          <div style={{ position: "relative", top: "-30px" }}>
            <h4 className="text-white">{UserAuthStatus.username}</h4>
            <p className="text-white">Joined on 12/06/2022</p>
            {/* {MetaUserAddress ? <p className="text-white">MetaMask Address:<br></br> {MetaUserAddress}</p> : <button className="btn btn-warning" onClick={MetamaskSignIn}>Connect MetaMask Wallet</button>} */}
            <div className="d-flex dashboard_submenu m-4">
              <Link className="dashboard_submenu_text" to="/user-dashboard">
                DASHBOARD
              </Link>
              <Link className="dashboard_submenu_text" to="collection">
                COLLECTIONS
              </Link>
              <span className="dashboard_submenu_text" onClick={SignOut}>
                SIGN OUT
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*Profile Stripe End*/}
      <Outlet />
    </div>
  );
}

export default MarketPlaceNew;
