import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import {UserFriendContainer} from '../containers/UserContainer'


import ChannelContainer from '../containers/ChannelContainer'
import ProfileHeader from '../components/ProfileHeader'




class UserShow extends Component {

    state = {
      view: 'channels'
    }

      changeView = (change) => {
         return this.setState({
          view: change
        })
      }

      componentDidUpdate(prevProps){
        if(this.props.userShow !== prevProps.userShow){
          this.setState({
            view: 'channels'
          })
        }
      }

      container = () => {
        const { view } = this.state
        const { userShow } = this.props

        if(view === "channels") {
          return (
            <Fragment>
            {userShow.channels ?
            <ChannelContainer channels={userShow.channels} />
            : <h4>No Channels to Show</h4>
            }
          </Fragment>
          )
        } else if(view === "myFriends"){
          return (
            <UserFriendContainer/>
          )
        } else if(view === "followedChannels"){
          return (
          <Fragment>
          {userShow.channel_follow[0] ?
            <ChannelContainer channels={userShow.channel_follow}/>
          : <h4>Not Following any Channels</h4>
          }
          </Fragment>
          )
        }
      }
  render() {
    const {userShow} = this.props
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <ProfileHeader user={userShow} changeView={this.changeView}/>
          {this.container()}
        </Fragment>
      :
      <center><div className="spinner tertiary"></div></center>
    }
    </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userShow: state.users.userShow
  }
}


export default withRouter(connect(mapStateToProps)(UserShow))
