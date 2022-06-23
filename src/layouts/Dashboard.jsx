import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SideMenu from "../components/SideMenu";

function Dashboard() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
