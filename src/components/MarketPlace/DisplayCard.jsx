import { useState } from "react";
import { Link } from "react-router-dom";

function DisplayCard(props) {
  const [MedalionObject, setMedalionObject] = useState({
    Yellow: "/assets/Nft_Yellow.gltf",
    Black: "/assets/Nft_Black.gltf",
    Ruby: "/assets/Nft_Ruby.gltf",
    Blue: "/assets/Nft_Blue.gltf",
    Gold: "/assets/Nft_Gold.gltf",
  });
  const URI_IMAGE_PATH = props.nft_uri;

  const [ShowBuyButton, SetShowBuyButton] = useState(false);
  const [DataSlide, SetDataSlide] = useState(null);
  return (
    <div className="col d-flex flex-column product-box">
      <div
        className="display_card"
        onMouseEnter={() => {
          SetShowBuyButton(true);
          SetDataSlide("-30px");
        }}
        onMouseLeave={() => {
          SetShowBuyButton(false);
          SetDataSlide(null);
        }}
      >
        <div className="nft_model m-auto">
          <model-viewer
            src={window.location.origin + MedalionObject[URI_IMAGE_PATH]}
            alt="VR Headset"
            auto-rotate
            camera-controls
            ar
            ios-src={window.location.origin + MedalionObject[URI_IMAGE_PATH]}
            style={{ height: "200px", width: "auto" }}
          ></model-viewer>
        </div>
        <Link
          to={`../view-single-nft/${props.nft_id}`}
          className="text-decoration-none"
        >
          {/* Card Info Block start */}
          <div style={{ marginTop: DataSlide }}>
            <div className="mb-1 small text-white">
              Medallion ID : {props.nft_journeyId}
            </div>
            <div className="market_place_nft_text text-uppercase">
              {props.nft_name}
            </div>
            <div className="mt-2 mb-3 text-white small">
              <span>Ocean ID : {props.nft_oceanId}</span>
              <br></br>
              <span>Elite Status : {props.nft_eliteStatus}</span>
              <br></br>
            </div>
          </div>
          {/* Card Info Block End */}
          {/* Card Block Button start */}
        </Link>
        {ShowBuyButton && (
          <div className="gap-1 d-grid">
            <button className="btn btn-warning">BUY NOW</button>
          </div>
        )}
        {/* Card Block Button end */}
      </div>
    </div>
  );
}

export default DisplayCard;
