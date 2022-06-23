import { ethers } from "ethers";
import { useState } from "react";

function HomePage() {
  //Ethers.js


  const ether_provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380");

  const LatestBlockNumber = async () => {
    return await ether_provider.getBlockNumber();
  };

  let [BlockNumber, setBlockNumber] = useState(0);

  const DisplayLatestBlockNumber = () => {
    LatestBlockNumber()
      .then((response) => {
        setBlockNumber(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="card-body">
        <h6>Dashboard</h6>
      </div>
      <button
        className="btn btn-success btn-sm"
        onClick={DisplayLatestBlockNumber}
      >
        Get Latest Block Number
      </button>
      <p>{BlockNumber}</p>
    </div>
  );
}

export default HomePage;
