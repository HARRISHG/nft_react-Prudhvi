import { ethers } from "ethers";
import ABI from "./Abi.json";

export const ContractAddress = "0xCbF8e77cBf0F274360498dbabbd097f8A18a0966"; //Rinkeby Contract Address
export const Abi = ABI; //Abi of Contract

//Sign in to MetaMask
export const MetamaskSignIn = async () => {
  if (typeof window.ethereum === "undefined") {
    return console.log("MetaMask is not installed!");
  } else {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }
};

export const CheckMetaMaskSignIn = () => {
  if (typeof window.ethereum === "undefined") {
    return false;
  }
};

export const GetUserAccount = async () => {
  const UserAccount = await MetamaskSignIn();
  return UserAccount;
};

export const GetUserNfts = async () => {
  const account = await MetamaskSignIn();
  const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
  const ContractInstance = new ethers.Contract(ContractAddress, Abi, provider);
  const balance = await ContractInstance.balanceOf(account);
  const Tokens_Array = [];
  for (let i = 0; i < 4; i++) {
    let OwnerToken = await ContractInstance.tokenOfOwnerByIndex(account, i);
    let fungible = await ContractInstance.fungible(OwnerToken);
    let nonfungible = await ContractInstance.nonfungible(OwnerToken);
    let Object = {
      ID: parseInt(nonfungible[0]),
      journeyId: nonfungible[1],
      oceanId: nonfungible[2],
      eliteStatus: nonfungible[3],
      URI: nonfungible[4],
      templateId: parseInt(fungible[0]),
      name: fungible[1],
      DNA: fungible[2],
      price: parseInt(fungible[3]),
    };
    Tokens_Array[i] = Object;
    /*
    SetUserTokens((Tokens_Array) => [
      ...Tokens_Array,

      {
        id: Object.ID,
        journeyId: Object.journeyId,
        oceanId: Object.oceanId,
        eliteStatus: Object.eliteStatus,
        URI: Object.URI,
        templateId: Object.templateId,
        name: Object.name,
        DNA: Object.DNA,
        price: Object.price,
      },
    ]);
    */
  }
  return Tokens_Array;
};

export const GetUserNftsNew = async () => {
  const account = await MetamaskSignIn();
  const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
  const ContractInstance = new ethers.Contract(ContractAddress, Abi, provider);
  const balance = await ContractInstance.balanceOf(account);
  //const Tokens_Array = [];
  //const Tokens_Array = await ContractInstance.getAllNftsByUsers(account);
  //console.log(Tokens_Array);
  if (balance > 0) {
    const Tokens_Array = await ContractInstance.getAllNftsByUsers(account);
    return Tokens_Array;
  } else {
    return "NO NFT's Found";
  }
  //console.log(Tokens_Array);
};

//Get NFT's Minted Balance
export const GetNFTBalance = async () => {
  const account = await MetamaskSignIn();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //provider.getBlockNumber().then(console.log);
  //provider.getBalance(account).then(console.log);
  const ContractInstance = new ethers.Contract(ContractAddress, Abi, provider);
  const balance = await ContractInstance.balanceOf(account);
  return parseInt(balance);
};

export const GetSingleNft = async (TokenId) => {
  const account = await MetamaskSignIn();
  if (account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider
    const ContractInstance = new ethers.Contract(
      ContractAddress,
      Abi,
      provider
    );
    const SingleNft = await ContractInstance.getNftByTokenid(TokenId);
    return SingleNft;
  } else {
    return "Sign In to MetaMask Wallet";
  }
};
