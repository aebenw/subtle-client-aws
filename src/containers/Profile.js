import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'
import ChannelContainer from './ChannelContainer'


class Profile extends Component {

  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }



  render(){

    const { currentUser } = this.props
    return (
      <Fragment>
        {this.props.currentUser.name ?
          <Fragment>
          <h1>{currentUser.name}'s Profile</h1>
          <ChannelContainer channels={currentUser.channels} />
          </Fragment>
      :
      <div className="spinner"></div>
    }
    </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
