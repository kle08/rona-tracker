import React from 'react';
import Home from './home/Home';
import Information from './information/Information';
import News from './news/News';
import Nav from './Nav';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
    <Nav/>
    <Switch>
    <Route path='/information' component={Information} />
    <Route path='/news' component={News} />
    <Route path='/' component={Home} />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
