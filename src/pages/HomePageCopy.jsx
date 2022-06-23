import * as fcl from "@onflow/fcl";

import { Link } from "react-router-dom";
import NftCard from "../components/NftCard";
import Data from "../MOCK_DATA.json";
//import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import ABI from "../Abi.json";

//Ethers
import { ethers } from "ethers";

function HomePage() {
  fcl.config({
    "app.detail.title": "Boo Boo Games",
    "app.detail.icon": "https://placekitten.com/g/200/200",
    "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Endpoint set to Testnet
    "0xProfile": "0xba1132bc08f82fe2",
  });

  /*
  Infura Testnet
  const url = "https://net.infura.io/v3/";
  const project_id = "0be5ac964dfe454badcdf19f581ea45e";
  const provider = new ethers.providers.JsonRpcProvider(url + project_id);
  */

  //Mumbai Polygon Test
  const url = "https://rpc-mumbai.matic.today/";
  //const project_id = "0be5ac964dfe454badcdf19f581ea45e";
  const provider = new ethers.providers.JsonRpcProvider(url);

  const [CurrentUser, SetCurrentUser] = useState({ loggedIn: null }); //user id

  const signer = provider.getSigner();

  const LatestBlockNumber = async () => {
    return await provider.getBalance(
      "0xb29061feF085EA807847DE47038Ac0e9942FEaD2"
    );
  };

  LatestBlockNumber()
    .then((res) => {
      const balance = ethers.utils.formatEther(res, 16);
      console.log(balance);
    })
    .catch((err) => {
      console.log(err);
    });

  const ContractAddress = "0x12bB1d962d0B78db154ad62E0CFAD679a76E1F3E";
  const Abi = ABI;

  // The Contract object
  const daiContract = new ethers.Contract(ContractAddress, Abi, provider);

  const ContractName = async () => {
    return await daiContract.name();
  };
  ContractName().then(console.log).catch(console.log);

  //const [CurrentUserName, SetCurrentUserName] = useState(null); //user name

  useEffect(() => fcl.currentUser.subscribe(SetCurrentUser), []); // sets the callback for FCL to use

  //Flow Login Method
  const FlowLogin = () => {
    fcl.authenticate();
  };

  /*
  const SendQuery = async () => {
    const profile = await fcl.query({
      cadence: `
      import Profile from 0xProfile
      pub fun main(address:Address):Profile.ReadOnly?{
        return Profile.read(address);
      }
      `,
      args: (arg, t) => [arg(CurrentUser.addr, t.Address)],
    });
    SetCurrentUserName(profile?.name ?? "Profile Not Found");
    console.log(CurrentUserName);
  };
  */

  const PlaceOrder = () => {
    if (!CurrentUser.loggedIn) {
      FlowLogin();
    } else {
      console.log("Placing Order");
      console.log(CurrentUser);
    }
  };

  //Flow Logout Method
  function FlowLogout() {
    fcl.unauthenticate();
  }

  return (
    <div>
      <div className="m-3 clearfix">
        <div className="float-start">
          <h4>Market Place</h4>
        </div>
        <div className="float-end">
          <Link className="btn btn-warning" to="create-nft">
            Create NFT
          </Link>
        </div>
      </div>
      {/*
      <div className="card-body border">
        <h6>Current User Data</h6>
        {CurrentUser.loggedIn ? (
          <div>
            <button className="btn btn-info" onClick={SendQuery}>
              Get UserName
            </button>
            <p>
              <span className="text-muted">User Name:</span>
              <br />
              {CurrentUserName}
            </p>
            <p>
              <span className="text-muted">User Address:</span>
              <br />
              {CurrentUser.addr}
            </p>
            <p>
              <span className="text-muted">User CID:</span>
              <br />
              {CurrentUser.cid}
            </p>

            <button className="btn btn-outline-dark" onClick={FlowLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-outline-success" onClick={FlowLogin}>
            Login
          </button>
        )}
      </div>
      */}

      <div className="m-4">
        {Data.map((each_row, index) => {
          return (
            <NftCard
              key={index}
              nft_name={each_row.nft_name.substring(0, 10)}
              nft_image={each_row.nft_image}
              nft_description={each_row.nft_description}
              nft_price={each_row.selling_price}
              place_order={PlaceOrder}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
