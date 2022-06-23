import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { MetaMaskUserAddressContext } from "../context";
import { MetamaskSignIn } from "../nft";

function MetaMaskSignInPage() {
  const [MetaUserAddress, SetMetaUserAddress] = useContext(MetaMaskUserAddressContext)
  const navigate = useNavigate();
  const ClickSignIn = async () => {
    await MetamaskSignIn()
      .then((response) => {
        sessionStorage.setItem("MetaMaskUserAddress",response);
        SetMetaUserAddress(sessionStorage.getItem("MetaMaskUserAddress",response));
      })
      .catch(console.log);
  };
  return (
    <div
      className="card-body col-md-3 text-center"
      style={{ margin: "auto", position: "relative", top: "20vh" }}
    >
      <h6 className="text-white">Wallet Sign In</h6>
      <button className="btn btn-warning" onClick={ClickSignIn}>
      {MetaUserAddress ? MetaUserAddress : "Wallet Sign In"}
      </button>
      {MetaUserAddress ? <Link to="user-dashboard" className="btn btn-warning">Dashboard</Link> : ""}
    </div>
  );
}

export default MetaMaskSignInPage;
