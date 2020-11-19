import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Home = lazy(() => import("../Pages/Home/Home"));
const Details = lazy(() => import("../Pages/Details/Details"));
const Results = lazy(() => import("../Pages/Results/Results"));

function App() {
  const [currentPage, setcurrentPage] = useState("home");
  const [isDetailsPage, setDetailsPage] = useState(false);
  console.log(currentPage, isDetailsPage);
  useEffect(() => {
    if (currentPage === "details") {
      setDetailsPage(true);
    } else {
      setDetailsPage(false);
    }
  }, [setcurrentPage, currentPage]);
  return (
    <div className="App">
      <Router history={history}>
        <Header isDetailsPage={isDetailsPage} />
        <Suspense fallback="chargement...">
          <Switch>
            <Route exact path="/">
              <Home setcurrentPage={setcurrentPage} />
            </Route>
            <Route exact path="/results">
              <Results setcurrentPage={setcurrentPage} />
            </Route>
            <Route exact path="/details/:id">
              <Details setcurrentPage={setcurrentPage} />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
