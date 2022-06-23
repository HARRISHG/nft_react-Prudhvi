import { Link } from "react-router-dom";

function NoTokens() {
  return (
    <div className="text-white" style={{ position: "relative", top: "20vh" }}>
      <div className="m-auto text-center">
        <h3>No Medallions Found</h3>
        <p>Pruchase in Market Place</p>
        <Link to="/market-place" className="btn btn-warning">
          Marketplace
        </Link>
      </div>
    </div>
  );
}

export default NoTokens;
