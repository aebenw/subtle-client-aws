import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/home' render={routerProps => <Home {...routerProps}/>} />
      </Fragment>
      </Router>
    );
  }
}

export default App;
