import Header from './Components/Layout/Header/Header';
import Footer from './Components/Layout/Footer/Footer';
import { lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

const Home= lazy(() => import('./Components/Pages/Home/Home'));
const Details= lazy(() => import('./Components/Pages/Details/Details'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Suspense fallback="chargement...">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/details/:id'>
            <Details />
          </Route>
        </Switch>
      </Suspense>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
