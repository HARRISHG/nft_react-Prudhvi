import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardMenu() {
  const UserAuthRole = useSelector((state) => state.role);
  return (
    <div className="">
      <div className="d-flex dashboard_submenu container">
        <Link
          className="dashboard_submenu_text"
          to={UserAuthRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
        >
          DASHBOARD
        </Link>
        {UserAuthRole === "admin" && (
          <Link className="dashboard_submenu_text" to="create-nft">
            CREATE NFT
          </Link>
        )}
        <Link className="dashboard_submenu_text" to="collection">
          {UserAuthRole === "admin" ? "NFT's MINTED" : "YOUR COLLECTIONS"}
        </Link>
      </div>
    </div>
  );
}

export default DashboardMenu;
