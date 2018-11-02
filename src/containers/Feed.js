import React from 'react';
import { connect } from 'react-redux'
import { token } from '../constants'
import { withRouter } from 'react-router-dom'
import { setHistory } from '../store/actions/users'




class Feed extends React.Component {


  componentDidMount() {
    if (token && !this.props.currentUser.email) {
      this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.email) {
      this.props.history.push('/')
    }
  }

  shouldComponentUpdate(nextProps){
    return this.props.currentUser === nextProps.currentUser ?  false :  true
  }


  render(){
    console.log("current user inside feed", this.props.currentUser)
    const { currentUser } = this.props
    return (
      <h1>{currentUser.name}'s FEED</h1>
    )
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    }
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
