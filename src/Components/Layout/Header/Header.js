import { withRouter, Link } from "react-router-dom";
import logoico from "../../../assets/logo.svg";

function Header(props) {
  const { history, isDetailsPage } = props;
  function getResults(e) {
    e.preventDefault();
    var value = e.target.querySelector("input").value;

    if (value.trim() === "") {
      return;
    }
    e.target.querySelector("input").value = "";
    history.push("/results?q=" + value.trim());
  }

  function handleLink(e, link) {
    e.preventDefault();
    history.push(link);
  }

  return (
    // <div className="App">

    <nav class="navbar navbar-expand-lg navbar-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        {/* go home */}
        <Link
          to={"/results?homepage"}
          onClick={(e) => handleLink(e, "/results?homepage")}
          Prevent
        >
          <img src={logoico} alt="moon logo icone"></img>
        </Link>
        {/* search bar */}
        <form class="form-inline">
          <input
            class="form-control loupe_img"
            type="search"
            placeholder="Rechercher un film"
            aria-label="Search"
          ></input>
        </form>
        {/* menu */}
        <ul class="navbar-nav mt-2 mt-lg-0">
          <li class="nav-item">
            <Link
              to={"/results?categories=popular"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
              Prevent
            >
              Populaires
            </Link>
            <div className="grips">|</div>

            <Link
              to={"/results?categories=top_rated"}
              onClick={(e) => handleLink(e, "/results?categories=top_rated")}
              Prevent
            >
              Les mieux notés
            </Link>
            <div className="grips">|</div>
            <Link
              to={"/results?categories=upcoming"}
              onClick={(e) => handleLink(e, "/results?categories=upcoming")}
              Prevent
            >
              À venir
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    /* </div> */
  );
}

export default withRouter(Header);
