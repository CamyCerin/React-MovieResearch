import { withRouter, Link } from "react-router-dom";
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
    <div className="App">
      <ul>
        <li>
          <Link to={"/"} onClick={(e) => handleLink(e, "/")} Prevent>
            Home{" "}
          </Link>{" "}
          |
          <Link
            to={"/results?categories=popular"}
            onClick={(e) => handleLink(e, "/results?categories=popular")}
            Prevent
          >
            Populaires
          </Link>
          |
          <Link
            to={"/results?categories=top_rated"}
            onClick={(e) => handleLink(e, "/results?categories=top_rated")}
            Prevent
          >
            Les mieux notés
          </Link>
          |
          <Link
            to={"/results?categories=upcoming"}
            onClick={(e) => handleLink(e, "/results?categories=upcoming")}
            Prevent
          >
            A venir
          </Link>
        </li>
        {!isDetailsPage && (
          <li>
            <form onSubmit={getResults}>
              <div className="row">
                <div className="form-group col-8">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Rechercher"
                  />
                </div>
              </div>
            </form>
          </li>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Header);
