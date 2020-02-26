import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// components
import Navbar from './shared/Navbar';
import Home from './home/Home';
import Dashboard from './task/pages/Dashboard';
import NewList from './task/pages/NewList';
import EditTask from './task/pages/EditTask';
import EditList from './task/pages/EditList';
import CreateTask from './task/pages/CreateTask';
import UserContext from './UserContext';
import axios from 'axios';
import Chart from './utils/Chart';
// scss
import './index.scss';
import MapContainer from './map/MapContainer';

function App() {

  const [user, setUser] = useState({
    isLoggedIn: false,
    profile: {}
  });

  useEffect(() => {
    axios.get('http://localhost:3001/', { withCredentials: true }).then(res => {
      getAuthUser(res.data.user, res.data.authenticated);
    });
  }, []);

  const getAuthUser = (userId, auth) => {
    axios.get(`http://localhost:3001/users/${userId}`).then(res => {
      setUser({
        isLoggedIn: auth,
        profile: res.data[0]
      });
    });
  }

  let routes;

  if (user.isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/dashboard/:listId' component={Dashboard} />
        <Route exact path='/dashboard/:listId/tasks' component={Dashboard} />
        <Route exact path='/new-list' component={NewList} />
        <Route exact path='/edit-list/:listId' component={EditList} />
        <Route exact path='/create-task/:listId' component={CreateTask} />
        <Route exact path='/dashboard/:listId/tasks/:taskId' component={EditTask} />
        <Route exact path='/map' component={MapContainer} />
        <Route exact path='/chart' component={Chart} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    )
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="bg">
          <Navbar />
          {routes}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
