import BloctoSDK from "@blocto/sdk";
import { transaction } from "@onflow/fcl";
import { ethers } from "ethers";
import { useState } from "react";
import ABI from "../../Abi.json";

function BlockTo() {
  //const TestUrl = "https://rpc-mumbai.matic.today/";
  const TestUrl =
    "https://rinkeby.infura.io/v3/0be5ac964dfe454badcdf19f581ea45e";
  //const TestUrl = "https://rpc-mumbai.maticvigil.com/";

  //const ContractAddress = "0x12bB1d962d0B78db154ad62E0CFAD679a76E1F3E"; //Mumbai Contract Address
  const ContractAddress = "0x3A4414Dd628fE88d05599f23Be10DAB5Eb474eEC"; //Rinkeby Contract Address
  const Abi = ABI;

  const WalletSignIn = () => {
    const bloctoSDK = new BloctoSDK({
      ethereum: {
        // (required) chainId to be used
        chainId: "0x13881",
        // (required for Ethereum) JSON RPC endpoint
        rpc: TestUrl,
      },
    });

    //For Wallet SignIn PopUp
    const accounts = bloctoSDK.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (bloctoSDK.ethereum.connected) {
      const provider = new ethers.providers.JsonRpcProvider(
        bloctoSDK.ethereum.url //Only pass url
      );
      const ContractInstance = new ethers.Contract(
        ContractAddress,
        Abi,
        provider
      );

      console.log("Ethereum", bloctoSDK.ethereum);

      //Read Methods
      // ContractInstance.name().then(console.log).catch(console.log);
      // ContractInstance.symbol().then(console.log).catch(console.log);

      const GetBalance = async () => {
        const balance = await provider.getBalance(
          bloctoSDK.ethereum.accounts[0]
        );
        return ethers.utils.formatEther(balance);
      };
      let Balance = "";
      GetBalance()
        .then((res) => {
          Balance = res;
          console.log("Assigned_Balance", Balance);
        })
        .catch(console.log);

      //Write Methods
      const signer = provider.getSigner();

      async function SingerAddress() {
        return await signer.getBalance();
      }

      SingerAddress().then(console.log).catch(console.log);

      const SignerContractInstance = ContractInstance.connect(signer);
      async function Transaction() {
        const response = await signer.sendTransaction({
          to: "0xb29061feF085EA807847DE47038Ac0e9942FEaD2",
          value: ethers.utils.parseEther("1.0"),
        });
        return response;
        //console.log("Tx", response);
      }
      // bloctoSDK.ethereum.enable();
      Transaction().then(console.log).catch(console.log);

      console.log("User Account", bloctoSDK.ethereum.accounts[0]);
      console.log("Provider", provider);
      console.log("Contract", ContractInstance);
      console.log("Signer", signer);
      console.log("SignerContractConnection", SignerContractInstance);
    } else {
      alert("User Not Connected");
    }
  };

  return (
    <div className="min-vh-100">
      {/* Home Page Content */}
      <div>
        <div
          className="text-center"
          style={{ position: "relative", top: "200px" }}
        >
          <h3>Sign In to Wallet</h3>
          <button className="btn btn-primary btn-lg" onClick={WalletSignIn}>
            Sign In
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default BlockTo;
