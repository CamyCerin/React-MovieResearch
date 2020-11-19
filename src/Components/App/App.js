import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import { lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Home= lazy(() => import('../Pages/Home/Home'));
const Details= lazy(() => import('../Pages/Details/Details'));
const Results= lazy(() => import('../Pages/Results/Results'));

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Suspense fallback="chargement...">
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/results'>
                    <Results />
                </Route>
                <Route exact path='/details/:id'>
                    <Details />
                </Route>
            </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
