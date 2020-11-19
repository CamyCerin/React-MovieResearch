// list param movies(type, page):
// latest, popular, top_rated, upcoming

// list param getMovie:
// similar

// param trending
// param1: all, movie, tv, person
// param2: day, week

const url = "https://api.themoviedb.org";
// const urlSite = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const urlSite = "https://image.tmdb.org/t/p/original";
const apiKey = "e88ee7e22a8fdc1c86a8c3a16bc76c17";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODhlZTdlMjJhOGZkYzFjODZhOGMzYTE2YmM3NmMxNyIsInN1YiI6IjVmYjRmNjkwYzE1Zjg5MDA0MDhjYmYwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZFq2Mu35OswIuP6YRrehiEEE06_PPwpBDLWjRsB6_6k";
const lng = "fr";

function api(method, get, query, data = null) {
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: "Bearer " + token,
  };

  data = data == null ? "" : `&${data}`;
  method = method.toUpperCase();
  let setUrl = fetch(
    `${url}/${get}${query}?api_key=${apiKey}&language=${lng}${data}`,
    { method, headers }
  );
  return setUrl.then((response) => response.json());
}

function getMovie(id, type = null) {
  let get = "3/movie/";
  type = type == null ? "" : `/${type}`;
  let query = id + type;

  return api("get", get, query);
}

function movies(type, page) {
  let get = "3/movie/";
  let data = `page=${page}`;

  return api("get", get, type, data);
}

function trending(param1, param2, page) {
  let get = "3/trending/";
  let query = `${param1}/${param2}`;
  let data = `page=${page}`;

  return api("get", get, query, data);
}

function list(page) {
  let get = "3/list/";
  let query = page;
  let data = `page=${page}`;

  return api("get", get, query, data);
}

function search(q, page) {
  let get = "3/search/";
  let query = "movie";
  let data = `query=${q}&page=${page}`;

  return api("get", get, query, data);
}

function urlApi() {
  return urlSite;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export { getMovie, movies, trending, list, search, urlApi, shuffle };

// list(1);
// list(2);
// list(3);
// list(4);
// getMovie(12);
// movies('upcoming', 2);
// search('nemo', 2);
// search('avatar', 1);
// search('avatar', 2);

// fetch(url + get + query + '?api_key=' + apiKey + '&query=' + search + '&page=1', {method, headers})
//   .then(response=> response.json())
//   .then(result=> console.log(result))
//         .catch(error => console.log(error))
