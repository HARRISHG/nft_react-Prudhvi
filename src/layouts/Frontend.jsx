import { Outlet } from "react-router-dom";
import Footer from "../frontend/Footer";
import WalletNavBar from "./../components/Wallet/WalletNavBar";

function Frontend() {
  return (
    <div>
      <WalletNavBar />
      {/*UI THEME HOME PAGE START*/}
      <div
        className="page_background page_background_image"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Frontend;
