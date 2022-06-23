import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSignOut from "../components/UserSignOut";

function NavBarNew() {
  const UserAuthStatus = useSelector((state) => state);

  return (
    <nav className="navbar navbar-expand-lg nav_background text-white sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex" to="/">
          <img
            src={window.location.origin + "/images/princess_logo.svg"}
            alt="Logo"
          ></img>
        </Link>
        {UserAuthStatus.token ? (
          <UserSignOut />
        ) : (
          <Link className="btn btn-outline-warning" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBarNew;
