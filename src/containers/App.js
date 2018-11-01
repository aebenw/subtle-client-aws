import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Feed from './Feed'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){

  }
  render() {
    // debugger
    const { currentUser } = this.props
    return (
      <Fragment>
        <Fragment>
          <Navbar />
          <Route exact path='/home' render={routerProps => <Home {...routerProps}/>} />
          <Route exact path='/signup' render={routerProps => <SignUp {...routerProps}/>} />
          <Route exact path='/login' render={routerProps => <Login {...routerProps}/>} />
          <Route exact path='/home' render={routerProps => <Feed {...routerProps}/>} />
        </Fragment>
        {currentUser ? <Feed /> : <Home />}

        </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(App);
