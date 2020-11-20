import { withRouter, Link } from "react-router-dom";
import logoico from "../../../assets/logo.png";
import logoico2 from "../../../assets/logo-2.png";

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
    <header id="header" className="header">
      {
        isDetailsPage &&
        <nav id="nav-bar" className="result"> 
          <Link
              className="mobile"
              to={"/results?categories=popular"}
              onClick={(e) => handleLink(e, "/results?categories=popular")}
            >
                <em className="fas fa-arrow-left"></em>
            </Link>

          <Link
              to={"/"}
              onClick={(e) => handleLink(e, "/")}
            >
              <img className="header-img" id="header-img" src={logoico2} alt="logo" />
            </Link>
            
            <div className="menu">
                <ul className="menu-link">
                    <li>
                      <Link
                          className="nav-link"
                          to={"/results?categories=popular"}
                          onClick={(e) => handleLink(e, "/results?categories=popular")}
                        >
                          Populaires
                        </Link>
                    </li>
                    <li>
                      <Link
                          className="nav-link NO"
                          to={"/results?categories=top_rated"}
                          onClick={(e) => handleLink(e, "/results?categories=top_rated")}
                        >
                          Les mieux notés
                      </Link>
                    </li>
                    <li>
                      <Link
                          className="nav-link no"
                          to={"/results?categories=upcoming"}
                          onClick={(e) => handleLink(e, "/results?categories=upcoming")}
                        >
                          à venir
                        </Link>
                    </li>
                </ul>
            </div>
            
        </nav>
      }

      {
        !isDetailsPage && 
        <nav id="nav-bar"> 
          <Link
              to={"/"}
              onClick={(e) => handleLink(e, "/")}
            >
              <img className="header-img" id="header-img" src={logoico} alt="logo" />
            </Link>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn"><span className="nav-icon"></span></label>
            
            <div className="menu">
                <form action="" className="form desktop" onSubmit={getResults}>
                    <div className="search">
                        <em className="fas fa-search"></em>
                    </div>
                    <input type="search" className="form-control" placeholder="rechercher un film" />
                </form>
                <ul className="menu-link">
                    <li>
                      <Link
                          className="nav-link"
                          to={"/results?categories=popular"}
                          onClick={(e) => handleLink(e, "/results?categories=popular")}
                        >
                          Populaires
                        </Link>
                    </li>
                    <li>
                      <Link
                          className="nav-link NO"
                          to={"/results?categories=top_rated"}
                          onClick={(e) => handleLink(e, "/results?categories=top_rated")}
                        >
                          Les mieux notés
                      </Link>
                    </li>
                    <li>
                      <Link
                          className="nav-link no"
                          to={"/results?categories=upcoming"}
                          onClick={(e) => handleLink(e, "/results?categories=upcoming")}
                        >
                          à venir
                        </Link>
                    </li>
                </ul>
            </div>
            
        </nav>
      }
  </header>
  );
}

export default withRouter(Header);
