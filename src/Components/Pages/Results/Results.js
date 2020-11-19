import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import { search, urlApi, movies } from "../../../services";
import { useEffect, useState } from "react";
import Moment from "react-moment";
Moment.globalLocale = "fr";

let page = 1;
let url = urlApi();

function Results(props) {
  console.log(props);
  const { history, setcurrentPage } = props;
  const values = queryString.parse(props.location.search);
  const [result, setResult] = useState([]);
  const [nbPage, setNbPage] = useState(1);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setcurrentPage("result");
  }, []);
  useEffect(() => {
    function getSearch(param) {
      let get;
      if (Object.hasOwnProperty.bind(values)("q")) {
        get = search(values.q, param);
        setMessage(`résultat de la recherche "${values.q}"`);
      } else if (Object.hasOwnProperty.bind(values)("categories")) {
        get = movies(values.categories, param);
        setMessage(`résultat de la catégorie "${values.categories}"`);
      } else {
        history.push("/");
        return;
      }

      get
        .then((res) => {
          setResult(res.results);
          setNbPage(res.total_pages);
        })
        .catch((error) => console.log(error));
    }
    const fetchSearch = async () => {
      try {
        getSearch(page);
      } catch (error) {
        // You can create an error state and set error here
        console.log(error);
      }
    };
    fetchSearch();
    return () => {
      // Do some cleanup
    };
  }, [page, history]);

  function nextPage(number) {
    page = number;
  }

  function getLink(number) {
    return (
      <button
        key={number}
        className="btn btn-primary ml-2"
        disabled={number === page ? "disabled" : null}
        onClick={() => {
          nextPage(number);
        }}
      >
        {number}
      </button>
    );
  }

  function getNumberPage() {
    if (nbPage === 1) {
      return "";
    }

    var tab = [];

    for (var i = 1; i <= nbPage; i++) {
      tab.push(getLink(i));
    }
    return tab;
  }
  console.log(nbPage, page);
  return (
    <div className="App">
      <h1 className="mb-4">{message}</h1>
      <div className="row mb-3">
        {result.map((item) => (
          <Link
            to={`/details/${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              history.push(`/details/${item.id}`);
            }}
            Prevent
            className="ml-4 mb-3 card col-3"
            key={item.id}
          >
            <img
              className="card-img-top"
              src={`${url}${item.poster_path}`}
              alt={item.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                <Moment format="DD MMMM YYYY">{item.release_date}</Moment>
              </p>
            </div>
          </Link>
        ))}
      </div>
      {getNumberPage()}
    </div>
  );
}
export default withRouter(Results);
