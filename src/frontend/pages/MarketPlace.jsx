import MenuBar from "../../components/MarketPlace/MenuBar";
import TitleBanner from "../../components/MarketPlace/TitleBanner";
import NftGrid from "../../components/NftGrid";

function MarketPlace() {
  return (
    <div>
      <TitleBanner />
      <MenuBar />
      <div className="container">
        <NftGrid />
      </div>
    </div>
  );
}

export default MarketPlace;
