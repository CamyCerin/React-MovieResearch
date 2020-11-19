import { movies, urlApi, shuffle } from "../../../services";
import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
Moment.globalLocale = "fr";

const categories = [
  { type: "popular", name: "Populaire" },
  { type: "top_rated", name: "Les mieux notés" },
  { type: "upcoming", name: "A venir" },
];
let url = urlApi();
const limit = 6;

function Home({ history }) {
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
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
  }, [categories]);

  function handleLink(e, link) {
    e.preventDefault();
    history.push(link);
  }

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
    <div className="App">
      {categories.map((cat, index) => (
        <section key={index}>
          <h3>
            <Link
              to={`/results?categories=${cat.type}`}
              onClick={(e) => handleLink(e, `/results?categories=${cat.type}`)}
              Prevent
            >
              {cat.name}
            </Link>
          </h3>
          <div className="row mb-3">
            {giveState(cat.type).map((item) => (
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
        </section>
      ))}
    </div>
  );
}

export default withRouter(Home);
