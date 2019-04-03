// Dependencies
import React from 'react';
import { Route, Switch ,
  BrowserRouter as Router
  } from 'react-router-dom';
// Components
import App from '../../App';

// Container

import GameList from '../gameList/GameList';

const AppRoutes = () =>
    <Router>
        <Switch>
          <Route path="/gamelist" component={GameList} />
          <Route path="/" component={App} />
        </Switch>
    </Router>

export default AppRoutes;