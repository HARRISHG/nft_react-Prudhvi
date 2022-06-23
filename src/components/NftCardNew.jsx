import { Link } from "react-router-dom";
import { useState } from "react";

function NftCardNew(props) {
  const [MedalionObject, setMedalionObject] = useState({
    Yellow: "/assets/Nft_Yellow.gltf",
    Black: "/assets/Nft_Black.gltf",
    Ruby: "/assets/Nft_Ruby.gltf",
    Blue: "/assets/Nft_Blue.gltf",
    Gold: "/assets/Nft_Gold.gltf",
  });
  const URI_IMAGE_PATH = props.nft_uri;

  return (
    <div className="col mb-5">
      <div className="bg-dark text-white" style={{"border-radius":"30px"}}>
        <model-viewer
          style={{
            width: "200px",
            height: "200px",
            margin: "auto",
          }}
          className="three-a"
          src={window.location.origin + MedalionObject[URI_IMAGE_PATH]}
          alt="VR Headset"
          auto-rotate
          camera-controls
          ar
          ios-src="assets/HTC_Vive_Headset.gltf"
        ></model-viewer>

        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{props.nft_name}</h5>
            Elite Status : {props.nft_eliteStatus}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <Link
              to={`../view-single-nft/${props.nft_id}`}
              className="btn btn-warning"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCardNew;
