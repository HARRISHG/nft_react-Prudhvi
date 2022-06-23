import { Link } from "react-router-dom";
function MenuBar() {
  return (
    <div className="container">
      <div className="row col-sm-12">
        <Link to="#" className="market_place_menubar_text text-white pe-5 col ">
          FOR SALE
        </Link>
        <Link to="#" className="market_place_menubar_text text-white pe-5 col">
          LATEST SALE
        </Link>
        <Link to="#" className="market_place_menubar_text text-white pe-5 col">
          TOP SALE
        </Link>
        <Link to="#" className="market_place_menubar_text text-white pe-5 col">
          TIMED AUCTION
        </Link>
        <Link to="#" className="market_place_menubar_text text-white pe-5 col">
          OPEN AUCTION
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
