import { getMovie, urlApi } from "../../../services";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Moment from "react-moment";
Moment.globalLocale = "fr";
let genres = [];

let url = urlApi();
function Details(props) {
  const id = props.match.params.id;
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        getMovieDetail(id);
        getSimilareMovie(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearch();
    return () => {
      // Do some cleanup
    };
  }, [id]);

  function getMovieDetail(movieId) {
    getMovie(movieId)
      .then((res) => {
        setMovie(res);
        genres = res.genres;
        console.log(res);
      })
      .catch((error) => console.log(error));
  }
  function getSimilareMovie(movieId) {
    getMovie(movieId, "similar")
      .then((res) => {
        setSimilar(res.results);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  function listGenres() {
    if (genres.length === 0) {
      return;
    }
    let listGenre = genres[0].name;
    for (let i = 1; i < genres.length; i++) {
      listGenre += ` - ${genres[i].name}`;
    }
    return listGenre;
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col-7">
          <div className="container">
            <h2>{movie.title}</h2>
            <p>{listGenres()}</p>
            <p className="mt-3">{movie.overview}</p>
            <h3>
              <Moment format="DD MMMM YYYY">{movie.release_date}</Moment>
            </h3>
          </div>
        </div>
        <div className="col-5">
          <img
            className="col-12"
            src={`${url}${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </div>
    </div>
  );
}
export default withRouter(Details);
