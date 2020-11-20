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
    <div className="detail-movie">
        <div className="detail" >
            <div className="img">
                <img src={`${url}${movie.poster_path}`} className="img" alt={movie.title} />
                <div className="blur"></div>
            </div>
            <div className="text">
                <div className="text-content">
                    <h2 className="tittle">
                      {movie.title} 
                      <Link to={{ pathname: movie.homepage }} target="_blank">
                        <img src={linkico} alt="link icon" className="mobile"/>
                      </Link>
                    </h2>
                    <h4 className="small-tittle">{movie.tagline}</h4>
                    <h4 className="small-tittle-2">{listGenres()}</h4>
    
                    <div className="tag">
                        <div className="tag-item">
                            <img src={bookico} alt="bookmark" />
                            <p className="desktop">Ajouter à ma liste</p>
                        </div>
                        <div className="tag-item">
                            <img src={eyeico} alt="eye-off" />
                            <p className="desktop">Audiodescription</p>
                        </div>
                        <div className="tag-item desktop">
                          <Link to={{ pathname: movie.homepage }} target="_blank"><img src={linkico} alt="link" /></Link>
                          <p className="desktop">Fiche du film</p>
                        </div>
                        <div className="tag-item prog">
                            <div className="star-groups">
                              {iconsVote.map((el, index) => (
                                <img 
                                  key={index}
                                  src={el}
                                  alt={"etoile" + index} />
                              ))}
                            </div>
                            <p className="desktop">Note des utilisateurs</p>
                        </div>
                    </div>
                    <div className="synops">
                      {movie.overview}
                    </div>
                    <p className="date-sortie">
                      <em class="far fa-calendar-alt"></em>      
                      <Moment format="DD MMMM YYYY">{movie.release_date}</Moment>
                    </p>
                </div>
            </div>
        </div>
    </div>

  );
}
export default withRouter(Details);
