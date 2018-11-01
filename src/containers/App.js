import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Welcome from './Welcome'
import Feed from './Feed'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import { token } from '../constants'
import { fetchWithToken } from '../store/actions/users'


class App extends Component {

  componentDidMount(){
    if (token && !this.props.currentUser) {
      debugger
      this.props.fetchWithToken(token)
      .then(() => this.props.history.push('/home'))
    } else if (this.props.currentUser) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <Fragment>
        <Fragment>
          <Navbar />
          <Route exact path='/' render={routerProps => <Welcome {...routerProps}/>} />
          <Route exact path='/signup' render={routerProps => <SignUp {...routerProps}/>} />
          <Route exact path='/login' render={routerProps => <Login {...routerProps}/>} />
          <Route exact path='/home' render={routerProps => <Feed {...routerProps}/>} />
        </Fragment>


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

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(App));


// {currentUser ? <Feed /> : <Home />}
