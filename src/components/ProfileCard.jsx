import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GetWebAuthUserInfo } from "./../WalletNft";

function ProfileCard() {
  const WalletAuthUser = useSelector((state) => state.wallet);
  const [UserProfileImage, SetUserProfileImage] = useState(null);
  const [UserProfileName, SetUserProfileName] = useState(null);

  useEffect(() => {
    GetWebAuthUserInfo().then((response) => {
      SetUserProfileImage(response.profileImage);
      SetUserProfileName(response.name);
    });
  }, []);

  return (
    <div className="pt-3 pb-2 market_place_stripe_background">
      <div className="container">
        <img
          src={
            UserProfileImage
              ? UserProfileImage
              : window.location.origin + "/images/profile_img.jpg"
          }
          alt="Profile"
          className="profile_image"
        ></img>
        <div className="mt-3">
          <h4 className="text-white profile_name text-uppercase">
            {UserProfileName}
          </h4>
          <p className="text-white">{WalletAuthUser.account}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
