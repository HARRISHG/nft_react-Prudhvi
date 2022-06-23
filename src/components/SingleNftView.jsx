import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { GetSingleNft } from "../nft";

function SingleNftView() {
  const { TokenId } = useParams();
  const CurrentToken = TokenId;
  const [NftData, SetNftData] = useState([]);

  useEffect(() => {
    GetSingleNft(CurrentToken)
      .then((response) => {
        SetNftData((NftData) => [response]);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <div className="d-flex">
        <div className="col-md-6">MODEL</div>
        <div className="col-md-6">
          {NftData.map((element, index) => {
            return (
              <h1 className="text-white" key={index}>
                {element.eliteStatus}
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SingleNftView;
