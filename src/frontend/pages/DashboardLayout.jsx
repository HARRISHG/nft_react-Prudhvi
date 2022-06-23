import { Outlet } from "react-router";
import DashboardMenu from "../../components/DashboardMenu";
import ProfileCard from "../../components/ProfileCard";

function DashboardLayout() {
  return (
    <div>
      <ProfileCard />
      <DashboardMenu />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
