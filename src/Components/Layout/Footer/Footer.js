import logoico from "../../../assets/logo.png";
import { withRouter, Link } from "react-router-dom";

function Footer(props) {
  const { history } = props;

  function handleLink(e, link) {
    e.preventDefault();
    history.push(link);
  }

  return (
    <footer>
      <div className="top-footer">
          <div className="logo-footer">
              <img src={logoico} alt="" />
          </div>
          <div className="menu-footer">
          <Link
              to={"/"}
              onClick={(e) => handleLink(e, "/")}
            >
              Home
            </Link>

            <Link
              to={"/"}
              onClick={(e) => handleLink(e, "/")}
            >
              Contact
            </Link>
            <Link
              to={"/r"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
            >
              Films
            </Link>
          </div>
          <div className="social-link">
          <Link
              to={"/r"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
            >
              <em className="fab fa-facebook-square"></em>
            </Link>
              <Link
              to={"/r"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
            >
              <em className="fab fa-instagram"></em>
            </Link>
            <Link
              to={"/r"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
            >
              <em className="fab fa-twitter"></em>
            </Link>
          </div> 
      </div>
      <div className="copyright">
          Designed with 💛 by
          <p>Camille, Imene, Nastia and Oliwia.</p>
      </div>
  </footer>
  );
}
export default withRouter(Footer);
