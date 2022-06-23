import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer-section">
      <div className="container">
        <div className="text-center">
          <img
            src={window.location.origin + "/images/princess_logo.svg"}
            alt="Logo"
          ></img>
        </div>

        <div className="text-center my-3">
          <Link className="px-3 text-decoration-none" to="#">
            <b className="small text-white" style={{ display: "inline-block" }}>
              DROPS
            </b>
          </Link>
          <Link
            className="px-3 text-decoration-none active"
            style={{ display: "inline-block" }}
            aria-current="page"
            to="/market-place"
          >
            <b className="small text-white">MARKETPLACE</b>
          </Link>
          <Link
            className="px-3 text-decoration-none"
            style={{ display: "inline-block" }}
            to="#"
          >
            <b className="small text-white">CHALLENGES</b>
          </Link>
          <Link
            className="px-3 text-decoration-none"
            style={{ display: "inline-block" }}
            to="#"
          >
            <b className="small text-white">COMMUNITY</b>
          </Link>
          <Link
            className="px-3 text-decoration-none"
            style={{ display: "inline-block" }}
            to="#"
          >
            <b className="small text-white">BLOG</b>
          </Link>
        </div>

        <div className="text-center">
          <img
            src={window.location.origin + "/images/Facebook.png"}
            className="face px-4"
            alt="Facebook"
          ></img>
          <img
            src={window.location.origin + "/images/instagram.png"}
            className="inst px-4"
            alt="Instagram"
          ></img>
          <img
            src={window.location.origin + "/images/twitter.png"}
            className="twi px-4"
            alt="Twitter"
          ></img>
          <img
            src={window.location.origin + "/images/linkedin.png"}
            className="lin px-4"
            alt="Linkedin"
          ></img>
        </div>
        <div className="text-center py-3 m-0">
          <p className="all m-0">
            2022 All Right Reserved <span className="company">- Princess</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
