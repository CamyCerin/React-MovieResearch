import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { search, urlApi, movies } from "../../../services";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Moment from "react-moment";
Moment.globalLocale = "fr";

let page = 1;
let url = urlApi();

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    },
  },
}));

function Results(props) {

  const { history, setcurrentPage } = props;
  const values = queryString.parse(props.location.search);
  const [result, setResult] = useState([]);
  const [nbPage, setNbPage] = useState(1);
  const [message, setMessage] = useState("");
  const classes = useStyles();
  
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
    var tab = number.target.ariaLabel.split(" ")
    let num;
    for(var i=0; i<tab.length; i++){
      if(!isNaN(tab[i])){
        num =  parseInt(tab[i]);
      }
    }
    page = num;
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
      
      <div className={classes.root+" pag"}>
        <Pagination  
          onClick={(e) => {
            nextPage(e);
          }} 
          count={nbPage} 
          shape="rounded" 
          color="primary" 
          showFirstButton 
          showLastButton />
      </div>

      {/*getNumberPage()*/}
    </div>
  );
}
export default withRouter(Results);
