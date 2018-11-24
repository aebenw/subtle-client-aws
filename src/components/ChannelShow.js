import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


import {lister} from '../functions'

//COMPONENTS
import ChannelHeader  from './ChannelHeader'

//CONTAINERS
import { ChannelFollowerContainer } from '../containers/UserContainer'
import BlockContainer from '../containers/BlockContainer'

//ACTIONS
import {fetchUserInfo} from '../store/actions/users'
import {followChannel, unFollowChannel, deleteChannel, rmCurrChannel, fetchChannel} from '../store/actions/channels'



class ChannelShow extends Component {
    state = {
      view: "blocks"
    }



  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, currentChannel } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentChannel){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)

      this.props.showChannel(id)
    }
  }

      changeView = (change) => {
         return this.setState({
          view: change
        })
      }

        container = () => {
          const { view } = this.state
          const { currentChannel  } = this.props

          if(view === "blocks") {
            return (
              <BlockContainer blocks={currentChannel.blocks}/>
            )
          } else if(view === "followers"){
            return (
              <Fragment>
              {currentChannel.followers[0] ?
              <ChannelFollowerContainer/>
              : <h3>No Followers</h3>}
              </Fragment>
            )
          }
        }

    render(){

    const { currentChannel } = this.props
    return(
      <Fragment>
        {currentChannel ?
          <Fragment>
            <ChannelHeader currentChannel={currentChannel} changeView={this.changeView} view={this.state.view}/>

            {this.container()}

          </Fragment>
        : <center><div className="spinner tertiary"></div></center>
        }
      </Fragment>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    showChannel: (channel) =>
     dispatch(fetchChannel(channel))
  }
}


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
