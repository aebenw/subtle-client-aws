import React from 'react'
import { connect } from 'react-redux'
import { withRouter, link } from 'react-router-dom'



const FriendContainer = (props) => {

  // return(
  //
  // )

}


const mapStateToProps = (state) => {
  return {friends: state.currentUser}
}
export default withRouter(connect(mapStateToProps)(FriendContainer))
