import { useEffect, useState } from "react";
import DisplayCard from "./MarketPlace/DisplayCard";
import { useMoralis } from "react-moralis";
import { GetUserNftsNew } from "./../WalletNft";
import NoTokens from "./NoTokens";

function NftGrid() {
  const { isInitialized, Moralis, isAuthenticated } = useMoralis();
  const [UserTokens, SetUserTokens] = useState(null);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      GetUserAccount();
    }
  }, [isInitialized]);

  const GetUserAccount = async () => {
    const currentUser = Moralis.User.current();
    if (currentUser) {
      const user_account = await currentUser.get("ethAddress");
      const UserTokens = await GetUserNftsNew(user_account);
      if (UserTokens) {
        SetUserTokens(UserTokens);
      } else {
        console.log("No Tokens Found");
      }
    } else {
      console.log("User Not Logged In");
      // show the signup or login page
    }
  };

  return (
    <div>
      <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 box-prod ms-auto my-5">
        {UserTokens ? (
          UserTokens.map((each_row, index) => {
            return (
              <DisplayCard
                key={parseInt(each_row.id)}
                nft_id={parseInt(each_row.id)}
                nft_name={each_row.name}
                nft_journeyId={each_row.journeyId}
                nft_oceanId={each_row.oceanId}
                nft_uri={each_row.eliteStatus}
                nft_eliteStatus={each_row.eliteStatus}
              />
            );
          })
        ) : (
          <NoTokens />
        )}
      </div>
    </div>
  );
}

export default NftGrid;
