import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/login';
import Progress from './pages/Progress/progress.jsx';
import Home from './pages/Home/home.jsx';
import Results from './pages/Results/results.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/progress" component={Progress} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </Router>
  );
}

export default App;
