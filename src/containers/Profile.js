import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'
import ChannelContainer from './ChannelContainer'
import ProfileHeader from '../components/ProfileHeader'
import {FriendContainer} from './UserContainer'


class Profile extends Component {
  state = {
    view: "channels"
  }

  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }


  changeView = (change) => {
     return this.setState({
      view: change
    }, () => console.log(this.state))
  }

  container = () => {
    const { view } = this.state
    const { currentUser } = this.props

    if(view === "channels") {
      return (
        <ChannelContainer channels={currentUser.channels} />
      )
    } else if(view === "myFriends"){
      return (
        <FriendContainer/>
      )
    } else if(view === "followedChannels"){
      return (
        <ChannelContainer channels={currentUser.channel_follow}/>
      )
    }
  }


  render(){
    const { currentUser } = this.props
    const { view } = this.state

    return (
      <Fragment>




        {currentUser.name ?
          <Fragment>
          <ProfileHeader user={currentUser} changeView={this.changeView} view={view}/>


          {this.container()}

        </Fragment>
      :
      <center><div style={{"marginTop": "10em"}} className="spinner tertiary"></div></center>
    }

    </Fragment>
    )
  }

}


// <a href="#modal">Modal</a>
//
// <section class="modal--show" id="modal-text" tabindex="-1"
// role="dialog" aria-labelledby="modal-label" aria-hidden="true">
//
// <div class="modal-inner">
// <header id="modal-label"><h4>hello there</h4></header>
// <div class="modal-content"><h4>hello there</h4></div>
// </div>
//
// <a href="#!" class="modal-close" title="Close this modal" data-close="Close"
// data-dismiss="modal">?</a>
// </section>


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
