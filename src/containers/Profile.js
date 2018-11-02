import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'


class Profile extends React.Component {

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
      <h1>{currentUser.name}'s Profile</h1>
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
