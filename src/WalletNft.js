import { ethers } from "ethers";
import ABI from "./Abi.json";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";


const clientId =
  "BKNvAoPGYAHF3GP3xl9zbWCW6xKaFmhMWocrcozJLXcjJGk-7gE0Bn6hqNkJDLtPz0csjqk63KR8P2cADFT00Gc";

export const ContractAddress = "0xCbF8e77cBf0F274360498dbabbd097f8A18a0966"; //Rinkeby Contract Address
export const Abi = ABI; //Abi of Contract

const Web3Configuration = {
  clientId,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x4",
    rpcTarget: "https://rinkeby.infura.io/v3/926a74ce9c2c48ecab5133c69cc87b4f",
  },
};

//Wallet Initialization not using now
export const Init = async () => {
  try {
    const web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x4",
        rpcTarget:
          "https://rinkeby.infura.io/v3/926a74ce9c2c48ecab5133c69cc87b4f",
      },
      // uiConfig: {
      //   appLogo: "https://images.web3auth.io/web3auth-logo-w.svg",
      //   theme: "light",
      //   loginMethodsOrder: ["facebook", "google"],
      // },
    });
    await web3auth.initModal(); //Initialize Modal
    return web3auth;
  } catch (error) {
    console.error(error);
  }
};

export const GetWebAuthUserInfo = async () => {
  const web3auth = await Init();
  return await web3auth.getUserInfo();
};

export const GetUserNftsNew = async (account) => {
  try {
    const web3auth = new Web3Auth(await Web3Configuration);
    await web3auth.initModal();
    const Provider = await web3auth.connect(); //Provider
    if (Provider) {
      const providers = new ethers.providers.Web3Provider(Provider);
      //const signer = providers.getSigner();
      const ContractInstance = new ethers.Contract(
        ContractAddress,
        Abi,
        providers
      );
      //const name = await ContractInstance.name();
      const balance = await ContractInstance.balanceOf(account);
      if (!parseInt(balance)) {
        return false;
      } else {
        const Tokens_Array = await ContractInstance.getAllNftsByUsers(account);
        return Tokens_Array;
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// //Get NFT's Minted Balance
// export const GetNFTBalance = async () => {
//   const account = await GetUserWalletAddress();
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //provider.getBlockNumber().then(console.log);
//   //provider.getBalance(account).then(console.log);
//   const ContractInstance = new ethers.Contract(ContractAddress, Abi, provider);
//   const balance = await ContractInstance.balanceOf(account);
//   return parseInt(balance);
// };

// export const GetSingleNft = async (TokenId) => {
//   const account = await GetUserWalletAddress();
//   if (account) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
//     const ContractInstance = new ethers.Contract(
//       ContractAddress,
//       Abi,
//       provider
//     );
//     const SingleNft = await ContractInstance.getNftByTokenid(TokenId);
//     return SingleNft;
//   } else {
//     return "Sign In to MetaMask Wallet";
//   }
// };
