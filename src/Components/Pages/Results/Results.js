import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { search, urlApi, movies } from "../../../services";
import { useEffect, useState } from "react";
import Moment from "react-moment";
Moment.globalLocale = "fr";

let page = 1;
let url = urlApi();

function Results(props) {
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
  }, [page, values, history]);

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
  return (
    <div className="app-result">
      <div className="container-title">
        <h4>{message}</h4>
      </div>
      {
        result.length === 0 && 
        <div className="notFound">
          <p>Résultat introuvable</p>
          <ul>
            <li>Vérifier l'orthographe de votre recherche</li>
            <li>Essayez un autre mot</li>
            <li>Ou mettez une lettre en générale</li>
          </ul>
        </div>
      }
      <div className="container-fluid body-block">
          <main className="page-content">
            {result.map((item) => (
              <div 
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/details/${item.id}`);
                }}
                className="card" 
                style={{"--poster": `url(${url}${item.poster_path})`}}>
                <div className="content">
                    <h2 className="title">{item.title} <span><Moment format="DD MMMM YYYY">{item.release_date}</Moment></span></h2>
                    <p className="copy">{item.overview}</p>
                </div>
              </div>
            ))}
          </main>
      </div>
      {getNumberPage()}
    </div>
  );
}
export default withRouter(Results);
