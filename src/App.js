import './App.css';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import Country from "./pages/Country";
import CountryList from "./pages/CountryList";
import Vaccines from "./pages/Vaccines";


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CountryList />
        </Route>
        <Route exact path="/:country/cases">
          <Country />
        </Route>
        <Route exact path="/:country/vaccines">
          <Vaccines />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;