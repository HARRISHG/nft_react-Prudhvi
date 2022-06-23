import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Abi, ContractAddress, GetSingleNft, MetamaskSignIn } from "../nft";
import { useNavigate } from "react-router";

function EditNft() {
  const { TokenId } = useParams();
  const CurrentToken = TokenId;

  //NFT Form Data
  const [name, setname] = useState("");
  //NFT Form Data End

  const [EditStatus, SetEditStatus] = useState("");
  const navigate = useNavigate();


  const EditNft = async (event) => {
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

      //const balance = await ContractInstance.balanceOf(account);
      //const Tokens_Array = [];
      //const ToAddress = "0xb29061feF085EA807847DE47038Ac0e9942FEaD2";
      //Connecting Signer with Contract

      const SignerContractInstance = ContractInstance.connect(signer);
      console.log("Singer Contract", SignerContractInstance);
      console.log("Current Token", CurrentToken);
      SignerContractInstance["change_fungible(uint256,string,string,uint256)"](
        CurrentToken,
        name,
        "Temporary DNA",
        0
      )
        .then((response) => {
          SetEditStatus("NFT Editing On Process, Please wait");
          ContractInstance.on(
            "Edit",
            (from, to, tokenId, event) => {
              //console.log(event);
              console.log(
                "NFT Successfully Edited"
              );
              SetEditStatus(
                "NFT Successfully Edited"
              );
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

  useEffect(() => {
    GetSingleNft(CurrentToken)
      .then((response) => {
        console.log(response);
        setname(response.name);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="container" style={{ position: "relative", top: "10vh", "min-height": "80vh" }}>
      <h5 className="text-center text-white">Edit Nft</h5>
      {EditStatus ? <p className="text-white text-center m-2">{EditStatus}</p> : ""}
      <div
        className="col-md-4" style={{margin:"auto"}}
      >
        <form onSubmit={EditNft} className="card card-body">
          <div className="m-2">
            <label>Nft Name</label>
            <input
              type="text"
              name="nft_name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="m-2 d-flex">
            <Link
              to={`../view-single-nft/${CurrentToken}`}
              className="btn col btn-outline-dark float-start m-3"
            >
              Back to Nft
            </Link>
            <button className="btn col btn-warning float-end m-3">
              Update NFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNft;
