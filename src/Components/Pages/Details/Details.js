import { getMovie, urlApi } from "../../../services";
import { withRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import bookico from "../../../assets/bookmark.svg";
import eyeico from "../../../assets/eye-off.svg";
import linkico from "../../../assets/link.svg";
import emptyico from "../../../assets/star-empty.svg";
import filledico from "../../../assets/star-filled.svg";
import halfico from "../../../assets/star-half.svg";

Moment.globalLocale = "fr";
let genres = [];

let url = urlApi();
const iconStar = {
  vide: emptyico,
  moitie: halfico,
  plein: filledico,
};
function Details(props) {
  const { setcurrentPage } = props;
  const id = props.match.params.id;
  const [movie, setMovie] = useState({});
  const [iconsVote, setIconsVote] = useState([]);
  useEffect(() => {
    setcurrentPage("details");
  }, []);
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        getMovieDetail(id);
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
        vote(res.vote_average);
        genres = res.genres;
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  function vote(param) {
    let modulo = param % 2;
    let stars = Math.round(param / 2);
    console.log(modulo, stars);
    let starsTab = ["vide", "vide", "vide", "vide", "vide"];
    for (var i = 0; i < stars; i++) {
      starsTab[i] = "plein";
    }
    if (modulo !== 0) {
      starsTab[stars] = "moitie";
    }
    let Tab = [];
    starsTab.forEach((element) => {
      Tab.push(iconStar[element]);
    });
    setIconsVote(Tab);
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
      <div className="moviescontainer d-flex">
        {/* img poster */}
        <div className="hero-poster">
          <img
            className="movieposter"
            src={`${url}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="blackShadow"></div>
        </div>
        {/* le reste */}
        <div className="container">
          <div className="detailsContainer">
            <h2>
              {movie.title}
              <Link to={{ pathname: movie.homepage }} target="_blank">
                <img className="icolink" src={linkico} alt="link icon" />
              </Link>
            </h2>
            <div className="movietagline">{movie.tagline}</div>
            <p>{listGenres()}</p>
            <div className="iconsrow">
              <div className="bookGroup">
                <img
                  className="icobookmark"
                  src={bookico}
                  alt="bookmark icon"
                />
                <p className="groupTitle">Ajouter à ma liste</p>
              </div>
              <div className="eyeGroup">
                <img className="icoeye" src={eyeico} alt="eye icon" />
                <p className="groupTitle">Audiodescription</p>
              </div>
              <div className="noteGroup">
                <div class="numberCircle">
                  {iconsVote.map((el, index) => (
                    <img
                      key={index}
                      className=""
                      src={el}
                      alt={"etoile" + index}
                    />
                  ))}
                </div>
                <p className="groupTitle">Note des utilisateurs</p>
              </div>
            </div>
            <p className="mt-3">{movie.overview}</p>
            <h3>
              <Moment format="DD MMMM YYYY">{movie.release_date}</Moment>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Details);
