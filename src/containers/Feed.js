import React from 'react';
import { connect } from 'react-redux'
import { fetchWithToken } from '../store/actions/users'
import { token } from '../constants'
import { withRouter } from 'react-router-dom'




class Feed extends React.Component {


  componentDidMount() {
    if ( !this.props.currentUser) { this.props.history.push('/')}


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
    }
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
