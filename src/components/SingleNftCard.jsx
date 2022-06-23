import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetSingleNft } from "../nft";

function SingleNftCard() {
  const { TokenId } = useParams();
  const CurrentToken = TokenId;
  const [SingleNft, SetSingleNft] = useState([]);

  const [MedalionObject, setMedalionObject] = useState({
    Yellow: "/assets/Nft_Yellow.gltf",
    Black: "/assets/Nft_Black.gltf",
    Ruby: "/assets/Nft_Ruby.gltf",
    Blue: "/assets/Nft_Blue.gltf",
    Gold: "/assets/Nft_Gold.gltf",
  });

  useEffect(() => {
    GetSingleNft(CurrentToken)
      .then((response) => {
        SetSingleNft((SingleNft) => [response]);
      })
      .catch(console.log);
  }, [CurrentToken]);

  return (
    <div className="container vh-100">
      {SingleNft.map((element, index) => {
        return (
          <div
            className="row gx-4 gx-lg-5 align-items-center"
            style={{ position: "relative", top: "10vh" }}
            key={index}
          >
            <div className="col-md-6">
              <model-viewer
                className="three-b"
                style={{ width: "500px", height: "500px" }}
                src={
                  window.location.origin + MedalionObject[element.eliteStatus]
                }
                alt="VR Headset"
                auto-rotate
                camera-controls
                ar
                ios-src="assets/HTC_Vive_Headset.gltf"
              ></model-viewer>
            </div>
            <div className="col-md-6">
              <div className="banner-box">
                <div className="mb-1">Medallion Id: #{element.journeyId}</div>
                <h1 className="display-5 fw-bolder nfts-m">{element.name}</h1>
                <div className="mt-3 mb-3">
                  <span>Ocean ID : #{element.oceanId}</span>
                  <br></br>
                  <span>ELite Status : {element.eliteStatus}</span>
                  <br></br>
                </div>

                <div className="line"></div>
                <p className="text-white mt-2 mb-2">
                  This part will enlist the benefits associated with this
                  Medallion NFT.
                </p>
                <p className="lead"></p>
                <div className="d-flex justify-content-center">
                  <Link
                    className="custom_button flex-shrink-0 text-decoration-none text-dark m-2 btn-E"
                    to={`../edit-nft/${CurrentToken}`}
                  >
                    <b>EDIT</b>
                  </Link>
                  <Link
                    className="custom_button flex-shrink-0 text-decoration-none text-dark m-2 btn-T"
                    to={`../transfer-nft/${CurrentToken}`}
                  >
                    <b>TRANSFER</b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SingleNftCard;
