import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { token } from '../constants'

//ACTIONS
import {getContent} from '../store/actions/feed'
import { fetchWithToken } from '../store/actions/users'

//COMPONENTS
import LoggedOutNav from '../components/LoggedOutNav'
import LoggedInNav from '../components/LoggedInNav'

import Welcome from './Welcome'
import Feed from './Feed'
import Login from '../components/Login'
import SideBar from '../containers/SideBar'
import SignUp from '../components/SignUp'
import Profile from '../containers/Profile'
import ChannelShow from '../components/ChannelShow'
import NewChannel from '../components/NewChannel'
import NewBlock from '../components/NewBlock'
import BlockShow from '../components/BlockShow'
import UserShow from '../components/UserShow'
import {FriendContainer, NotFriendContainer} from '../containers/UserContainer'




class App extends Component {

  componentDidMount(){
    if (token && !this.props.currentUser.name && (this.props.history.location.pathname !== '/')) {
      this.props.getContent()
      .then(()=>  this.props.fetchWithToken(token) )
      .then(() => this.props.history.push(this.props.history.location.pathname))
    } else if (token && !this.props.currentUser.name ) {
      this.props.fetchWithToken(token)
      .then(() => this.props.history.push('/home'))
    }
    else if (this.props.currentUser.email) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    const { currentUser } = this.props
    return (
      <Fragment>
        <Fragment>
          {currentUser.email ?
            <LoggedInNav currentUser={currentUser}/>
          : <LoggedOutNav />}
          {/* <SideBar/> */}
          <div className="big-container">
          <Route exact path='/' render={routerProps => <Welcome {...routerProps}/>} />
          <Route exact path='/signup' render={routerProps => <SignUp {...routerProps}/>} />
          <Route exact path='/login' render={routerProps => <Login {...routerProps}/>} />
          <Route exact path='/home' render={routerProps => <Feed {...routerProps}/>} />
          <Route exact path='/profile' render={routerProps => <Profile {...routerProps}/>} />
          <Route  exact path={`/channels/new`} render={routerProps => <NewChannel {...routerProps}/>} />
          <Route  exact path={`/blocks/new`} render={routerProps => <NewBlock {...routerProps}/>} />
          <Route  exact path={`/users/:name`} component={UserShow} />
          <Route  exact path={`/friends`} render={routerProps => <FriendContainer {...routerProps}/>} />
          <Route  exact path={`/explore/people`} render={routerProps => <NotFriendContainer {...routerProps}/>} />
          <Route  path={`/channel/:channelID`} render={routerProps => <ChannelShow {...routerProps}/>} />
          <Route  path={`/block/:blockID`} render={routerProps => <BlockShow {...routerProps}/>} />
        </div>
        </Fragment>


        </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    setHistory: state.users.setHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWithToken: (token) => {
      return dispatch(fetchWithToken(token))
    },
    getContent: () => {
      return dispatch(getContent())
    }
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(App));
