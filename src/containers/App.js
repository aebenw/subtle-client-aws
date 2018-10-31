import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Login from '../components/login'
import SignUp from '../components/SignUp'

class App extends Component {
  render() {
    return (
      <Fragment>
      <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/home' render={routerProps => <Home {...routerProps}/>} />
      </Fragment>
      </Router>
        <SignUp />
        <Login />
      </Fragment>
    );
  }
}

export default App;
