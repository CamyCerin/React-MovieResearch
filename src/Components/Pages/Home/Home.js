import { movies, urlApi, shuffle } from "../../../services";
import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import startPleine from '../../../assets/star-pleine.png'
import startMoitie from '../../../assets/star-moitie.png'
//import startVide from '../../../assets/star-vide.png'
import bg from '../../../assets/bg.png'

import Moment from "react-moment";
Moment.globalLocale = "fr";

const categories = [
  { type: "popular", name: "Populaire" },
  { type: "top_rated", name: "Les mieux notés" },
  { type: "upcoming", name: "A venir" },
];
let url = urlApi();
const limit = 4;

function Home(props) {
  const { history, setcurrentPage } = props;
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setcurrentPage("home");
    function getSearch(param) {
      console.log(param.type);
      movies(param.type, 1)
        .then((res) => {
          shuffle(res.results);
          let newValues = [];
          for (let j = 0; j < limit; j++) {
            newValues.push(res.results[j]);
          }
          if (param.type === "popular") {
            setPopular(newValues);
          } else if (param.type === "top_rated") {
            setTop(newValues);
          } else if (param.type === "upcoming") {
            setUpcoming(newValues);
          }
        })
        .catch((error) => console.log(error));
    }
    const fetchSearch = async () => {
      try {
        for (var i = 0; i < categories.length; i++) {
          getSearch(categories[i]);
        }
      } catch (error) {
        // You can create an error state and set error here
        console.log(error);
      }
    };
    fetchSearch();
    return () => {
      // Do some cleanup
    };
  }, []);

  function handleLink(e, link) {
    e.preventDefault();
    history.push(link);
  }

  function giveState(type) {
    if (type === "popular") {
      return popular;
    } else if (type === "top_rated") {
      return top;
    } else if (type === "upcoming") {
      return upcoming;
    } else {
      return [];
    }
  }
  return (
    <>
      <div>
        <div id="movie-card-list">
            <div className="movie-card" style={{'--cover':`url(${bg})`}} data-movie="Blade Runner">
                <div className="movie-card__overlay"></div>
                <div className="movie-card__content">
                    <div className="cards__content">
                        <div className="movie-card__header">
                            <h1 className="tittle">Peninsula</h1>
                            <h4 className="movie-card__info">(23 Décembre 2020) Populaires <span class="bar"></span> Fantaisie - Aventure</h4>
                        </div>
                        <p className="movie-card__desc">
                            La péninsule se déroule quatre ans après Train to Busan, alors que les personnages 
                            se battent pour fuir un pays en ruine à la suite d'un désastre sans précédent.
                        </p>
                        <div className="avis">
                            <div className="star-groups">
                                <img src={startPleine} alt="pleine1" />
                                <img src={startPleine} alt="pleine2" />
                                <img src={startPleine} alt="pleine3" />
                                <img src={startPleine} alt="pleine4" />
                                <img src={startMoitie} alt="moitie" />
                            </div>
                            <p>d’avis positif</p>
                        </div>
                        <button className="btn movie-card__button" type="button">En savoir plus</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <main className="home">
      {categories.map((cat, index) => (
        <section key={index}>
            <div className="container-title">
                <h4>
                <Link
                    to={`/results?categories=${cat.type}`}
                    onClick={(e) => handleLink(e, `/results?categories=${cat.type}`)}
                  >
                    {cat.name}
                  </Link>
                </h4>
            </div>
            <div className="container-fluid body-block">
                <article className="page-content">
                  {giveState(cat.type).map((item) => (
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/details/${item.id}`);
                      }}
                      className="card" 
                      key={item.id}
                      style={{'--poster' : `url(${url}${item.poster_path})`}}>
                      <div className="content">
                        <h2 className="title">
                          {item.title} 
                          <span>
                              <Moment format="DD MMMM YYYY">{item.release_date}</Moment>
                          </span>
                        </h2>
                        <p className="copy">{item.overview}</p>
                      </div>
                    </div>
                  ))}
                </article>
            </div>
        </section>
      ))}
    </main>
    </>
  );
}

export default withRouter(Home);
