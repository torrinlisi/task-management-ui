import Home from './components/Home'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

import './css/navigation.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <SideBar />
      <div className="mainContent">
        <Router>
          <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
