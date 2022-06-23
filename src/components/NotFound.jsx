import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container vh-100">
      <div
        className="text-center"
        style={{ position: "relative", top: "30vh" }}
      >
        <h1 className="text-white">404 PAGE NOT FOUND!</h1>
        <p className="text-white">Please Click Below Links to Redirect</p>
        <Link className="btn btn-dark" to="/">
          Home
        </Link>{" "}
        <Link to="/login" className="btn btn-warning">
          {" "}
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
