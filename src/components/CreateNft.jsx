import { ethers } from "ethers";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { MetamaskSignIn, Abi, ContractAddress } from "../nft";

function CreateNft() {
  //NFT Form Data
  const [journeyId, setJoureyId] = useState("");
  const [oceanId, setoceanId] = useState("");
  const [eliteStatus, seteliteStatus] = useState("");
  const [name, setname] = useState("");
  //NFT Form Data End

  const [MintStatus, SetMintStatus] = useState("");
  const [MintedTokenId, SetMintedTokenId] = useState("");

  //Mint NFT
  const MintNft = async (event) => {
    event.preventDefault();
    const UserAccount = await MetamaskSignIn(); //User Address
    if (UserAccount !== "" || UserAccount !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
      const signer = provider.getSigner(); //Signer to Mint NFT
      const ContractInstance = new ethers.Contract(
        ContractAddress,
        Abi,
        provider
      );
      //Connecting Signer with Contract
      const SignerContractInstance = ContractInstance.connect(signer);
      SignerContractInstance.safeMint(
        UserAccount,
        journeyId,
        oceanId,
        eliteStatus,
        name,
        "Temporary DNA",
        0
      )
        .then((response) => {
          console.log(response.hash);
          SetMintStatus("NFT Minting On Process, please wait");
          //On Mint Completed
          ContractInstance.on(
            "Mint",
            (tokenId, to, oceanId, event) => {
              //console.log(event);
              SetMintedTokenId(tokenId);
              SetMintStatus("success");
              console.log("api token id : ", tokenId);
              console.log("State : ", MintedTokenId);
            }

            // The event object contains the verbatim log data, the
            // EventFragment and functions to fetch the block,
            // transaction and receipt and event functions
          );
        })
        .catch(console.log);
    } else {
      console.log("Not Signed in to MetaMask, Please Sign In");
      MetamaskSignIn();
    }
  };

  return (
    <div
      className="mb-4 container"
      style={{ position: "relative", top: "10vh", minHeight: "80vh" }}
    >
      <h5 className="text-center text-white mt-3">Create NFT</h5>
      {MintStatus === "success" ? (
        <Navigate to={`../view-single-nft/${MintedTokenId}`}></Navigate>
      ) : (
        <p className="text-white">{MintStatus}</p>
      )}
      <div className="col-md-4" style={{ margin: "auto" }}>
        <form onSubmit={MintNft} className="card-body text-white">
          <div className="m-2">
            <label>Medallion ID</label>
            <input
              type="text"
              name="journeyId"
              placeholder="Medallion ID"
              value={journeyId}
              onChange={(e) => setJoureyId(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="m-2">
            <label>Ocean ID</label>
            <input
              type="text"
              placeholder="Ocean ID"
              name="oceanId"
              onChange={(e) => setoceanId(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="m-2">
            <label>Elite Status</label>
            <select
              name="uri"
              className="form-control"
              onChange={(e) => seteliteStatus(e.target.value)}
            >
              <option selected disabled hidden>
                Select Elite Status
              </option>
              <option value="Black">Medallion Black</option>
              <option value="Blue">Medallion Blue</option>
              <option value="Ruby">Medallion Ruby</option>
              <option value="Yellow">Medallion Yellow</option>
              <option value="Gold">Medallion Gold</option>
            </select>
          </div>
          <div className="m-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => setname(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="m-2">
            <button className="btn btn-warning">Mint Nft</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNft;
