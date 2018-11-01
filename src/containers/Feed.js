import React from 'react';
import { connect } from 'react-redux'
import { fetchWithToken } from '../store/actions/users'
import { token } from '../constants'
import { withRouter } from 'react-router-dom'
import { setHistory } from '../store/actions/users'




class Feed extends React.Component {


  componentDidMount() {
    if (token && !this.props.currentUser) {
    this.props.setHistory(this.props.history.location.pathname)
     // this.props.fetchWithToken(token)
     this.props.history.push('/')

    }
    else if (!token && !this.props.currentUser) {
      debugger
      this.props.history.push('/')
    }
  }

  render(){
    console.log("current user inside feed", this.props.currentUser)
    return (
      <h1>FEED</h1>
    )
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    fetchWithToken: (token) => {
      return dispatch(fetchWithToken(token))
    },
    setHistory: (history) => {
      return dispatch(setHistory(history))
    }
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
