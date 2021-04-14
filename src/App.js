import Home from './components/Home'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import CreateTask from './components/CreateTask';

import './css/navigation.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <SideBar />
      <div className="mainContent">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create">
            <CreateTask />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;