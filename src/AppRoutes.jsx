import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";

//Layouts
import Frontend from "./layouts/Frontend";

//Pages
import HomePage from "./frontend/pages/HomePage";
//import MarketPlaceNew from "./frontend/pages/MarketplaceNew";
import NotFound from "./components/NotFound";

//Components
import EditNft from "./components/EditNft";
import CreateNft from "./components/CreateNft";
import SingleNftCard from "./components/SingleNftCard";
import TransferNft from "./components/TransferNft";
import Auth from "./components/Auth";
import DashboardLayout from "./frontend/pages/DashboardLayout";
//import SingleNftView from "./components/SingleNftView";
import MarketPlace from "./frontend/pages/MarketPlace";
import NftGrid from "./components/NftGrid";

function AppRoutes() {
  const WebAuthUser = useSelector((state) => state.wallet);
  return (
    <Routes>
      <Route path="/" exact element={<Frontend />}>
        <Route index element={<HomePage />}></Route>
        <Route
          exact
          path="login"
          element={WebAuthUser.account ? "Already Signed In" : <Auth />}
        ></Route>

        {WebAuthUser.account ? (
          <Route exact path="user-dashboard" element={<DashboardLayout />}>
            <Route path="edit-nft/:TokenId" element={<EditNft />} />
            <Route path="transfer-nft/:TokenId" element={<TransferNft />} />
            <Route exact path="collection" element={<NftGrid />}></Route>
            <Route
              exact
              path="view-single-nft/:TokenId"
              element={<SingleNftCard />}
            ></Route>
          </Route>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}

        <Route exact path="market-place" element={<MarketPlace />}></Route>
        <Route
          exact
          path="view-single-nft/:TokenId"
          element={<SingleNftCard />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
