import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { UserLoggedIn } from "../store/UserAuthenticationReducer";

const Users = [
  {
    id: 1,
    name: "Mr. Parag Amin",
    username: "user1@gmail.com",
    password: "user1",
    role: "user",
    token: "AOR34850Q843098209453342312DERE",
  },
  {
    id: 2,
    name: "Mr. Venu Krishnamoorthy",
    username: "user2@gmail.com",
    password: "user2",
    role: "user",
    token: "AFDSGAIRHEI340I34ADLFGK434343542",
  },
  {
    id: 3,
    name: "Admin Medallion Pay",
    username: "admin@gmail.com",
    password: "admin@123",
    role: "admin",
    token: "FNAIU439478548LJKFALMLMRMASLAGLRF",
  },
];

function Auth() {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [ErrorMessage, SetErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoggedInUserName = useSelector((state) => state.username);

  // useEffect(() => {
  //   console.log("User Changed");
  // }, [LoggedInUserName]);

  console.log("USE SELECTOR VALUE", LoggedInUserName);

  const UserSignIn = (event) => {
    event.preventDefault();
    const user = Users.find(
      (element) =>
        element.username === Username && element.password === Password
    );
    if (user !== undefined) {
      console.log("Successfully Logged In");
      //Local Storage
      localStorage.setItem("token", user.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("role", user.role);
      //Dispatching Action
      dispatch({
        type: UserLoggedIn,
        payload: {
          username: user.name,
          role: user.role,
          IsLoggedIn: true,
          token: user.token,
        },
      });

      navigate("/market-place");
    } else {
      SetErrorMessage("Wrong Credentials");
      console.log("User Doesn't exits", user);
    }
  };

  return (
    <div
      className="col-md-2 col-sm-6 col-xl-2 m-auto card"
      style={{ position: "relative", top: "20vh" }}
    >
      {ErrorMessage !== "" ? (
        <p className="alert alert-danger">{ErrorMessage}</p>
      ) : (
        ""
      )}
      <h5
        className="text-center pt-3 text-uppercase"
        style={{ fontWeight: "900" }}
      >
        Login
      </h5>
      <form onSubmit={UserSignIn}>
        <div className="m-3">
          <label htmlFor="UserName">Username : </label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => SetUsername(e.target.value)}
          />
        </div>

        <div className="m-3">
          <label htmlFor="UserName">Password : </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => SetPassword(e.target.value)}
          />
        </div>
        <div className="d-grid p-3">
          <button className="btn btn-warning">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
