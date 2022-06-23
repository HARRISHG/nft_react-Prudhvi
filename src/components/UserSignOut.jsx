import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserLoggedOut } from "../store/UserAuthenticationReducer";

function UserSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserAuthStatus = useSelector((state) => state);

  const SignOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("name", "");
    dispatch({
      type: UserLoggedOut,
      payload: { username: "", role: "", IsLoggedIn: false, token: "" },
    });
    navigate("/");
  };
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-white"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              to="#"
            >
              {UserAuthStatus.username}
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-light"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <Link
                  className="dropdown-item"
                  to={
                    UserAuthStatus.role === "admin"
                      ? "admin-dashboard"
                      : "user-dashboard"
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={SignOut}>
                  SignOut
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserSignOut;
