import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Feed from './Feed'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { connect } from 'react-redux'


import { token } from '../constants'
import { fetchWithToken } from '../store/actions/users'


class App extends Component {

  componentDidMount(){
    if (token && !this.props.current) { this.props.fetchWithToken(token)
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWithToken: (token) => {
      return dispatch(fetchWithToken(token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
