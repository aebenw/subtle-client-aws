import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'


class Event extends React.Component {

  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }

  shouldComponentUpdate(nextProps){
    return this.props.currentUser === nextProps.currentUser ?  false :  true
  }

  render(){
    const { currentUser } = this.props
    return (
      <h1>{currentUser.name}'s Event</h1>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event))
