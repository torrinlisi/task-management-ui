import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

import './css/navigation.css';
import './css/taskStyles.css';


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
          <Route path="/tasks">
            <TaskList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
