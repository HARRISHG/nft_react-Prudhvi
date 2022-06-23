import { ethers } from "ethers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContractAddress, Abi, MetamaskSignIn } from "../nft";
import { useNavigate } from "react-router";

function TransferNft() {
    const { TokenId } = useParams();
    const navigate = useNavigate();
  const CurrentToken = TokenId;
    const [ToAddress, SetToAddress] = useState("");
    const [TransferStatus, SetTransferStatus] = useState("");
    const TransferNft = async (event) => {
        event.preventDefault();
        const UserAccount = await MetamaskSignIn(); //User Address
        if (UserAccount !== "" || UserAccount !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
          console.log(provider);
          const signer = provider.getSigner(); //Signer to Mint NFT
          const ContractInstance = new ethers.Contract(
            ContractAddress,
            Abi,
            provider
          );
          const SignerContractInstance = ContractInstance.connect(signer);
          console.log("Singer Contract", SignerContractInstance);
          console.log("Current Token", CurrentToken);
          SignerContractInstance["safeTransferFrom(address,address,uint256)"](
            UserAccount,
            ToAddress,
            CurrentToken
          )
            .then((response) => {
              SetTransferStatus("NFT Transfering, Please wait");
              ContractInstance.on(
                "Transfer",
                (from, to, tokenId, event) => {
                  //console.log(event);
                  console.log(
                    "NFT Successfully Transfered"
                  );
    
                  SetTransferStatus("NFT Successfully Transfered");
                  navigate("../collection");
                }
                // The event object contains the verbatim log data, the
                // EventFragment and functions to fetch the block,
                // transaction and receipt and event functions
              );
            })
            .catch(console.log);
          // await SignerContractInstance.safeTransferFrom(
          //   UserAccount,
          //   "0xb29061feF085EA807847DE47038Ac0e9942FEaD2",
          //   0
          // );
        } else {
          console.log("Not Signed in to MetaMask, Please Sign In");
          MetamaskSignIn();
        }
      };

    return ( <div className="mb-4 container"
    style={{ position: "relative", top: "10vh", "min-height": "80vh" }}>
         <h5 className="text-center text-white mt-3">Transfer NFT</h5>
         <p className="text-white">{TransferStatus ? TransferStatus : ""}</p>
         <div className="col-md-4" style={{ margin: "auto" }}>
        <form onSubmit={TransferNft} className="text-white">
                <div className="m-3">
                  <label>To Address</label>
                  <input
                    type="text"
                    name="ToAddress"
                    value={ToAddress}
                    onChange={(e) => SetToAddress(e.target.value)}
                    className="form-control"
                    required
                    placeholder="Enter Wallet Address"
                  />
                </div>
                <div className="m-3 text-center">
                <button className="btn btn-warning">Transfer Now</button>
                </div>
              </form>
              <p className="text-white">{TransferStatus ? TransferStatus : "" }</p> 
              </div>
    </div> );
}

export default TransferNft;