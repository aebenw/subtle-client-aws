import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux'
import { token } from '../constants'
import { withRouter } from 'react-router-dom'
import { setHistory } from '../store/actions/users'
import {getContent} from '../store/actions/feed'

//Components
import Channel from '../components/channel/channel'
import Block from '../components/block/block'
import User from '../components/user/user'

//Containers
import BlockContainer from './BlockContainer'
import ChannelContainer from './ChannelContainer'




//ACTIONS
import { selectBlock } from '../store/actions/blocks'
import { showChannel } from '../store/actions/channels'
//Feed renders full data for blocks and channels
  //For now, doing what I'm doing elsewhere, which is another fetch rather then just showing the info I have.
    //To do this i need to either reconfig data or the way i'm rendering from the feed
import {fetchUserInfo} from '../store/actions/users'


class Feed extends Component {


  componentDidMount() {
    if (token && !this.props.currentUser.email) {
      this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.email) {
      this.props.history.push('/')
    }

    if(this.props.currentUser.email){
      console.log("comp did mount", this.props.currentUser.id)
      return this.props.getContent(this.props.currentUser.id)
    }
  }


  sortContent = () => {
    const { content, userShow } = this.props
    return content.feed.map(x => {
      if (x.type === "friends" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center><h3>{x.user.name} became friends with</h3></center>
          </div>
          </div>
          <div id="feed" className="row">
          {x.content.map(c => <User user={c} userShow={userShow}/>)}
          </div>
          </Fragment>
        )

      }
      else if (x.type === "followed_channels" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center><h3>{x.user.name} started following these channels </h3></center>
          </div>
          </div>

          <ChannelContainer channels={x.content}/>

          </Fragment>
        )

      }
      else if(x.type === "blocks" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center><h3>{x.user.name} made blocks</h3></center>
          </div>
          </div>
          <BlockContainer blocks={x.content}/>
          </Fragment>
        )

      } else if (x.type === "channels" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center><h3>{x.user.name} made channels</h3></center>
          </div>
          </div>

          <ChannelContainer channels={x.content}/>

          </Fragment>
        )
      }
    })
  }


  render(){
    const { content, userShow, channelShow, blockShow, currentUser } = this.props


    return (
      <Fragment >
        <div id="home-feed" className="row">
          <div className="col-lg-10">
        {content ?
          <Fragment>


            {this.sortContent()}
        </Fragment>



        : <center><div className="spinner tertiary"></div></center>}
      </div>
      </div>
      </Fragment>
    )
  }

}

// {currentUser.name ?
//   // <div className ="col-sm-2">
//
// <ProfileHeader currentUser={currentUser}/>
// // </div>
// : null}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    },
    getContent: (id) => {
      return dispatch(getContent(id))
    },
    channelShow: (channel) => {
      return dispatch(showChannel(channel))
    },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    blockShow: (block) => {
    return dispatch(selectBlock(block))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    content: state.feed.feedContent
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
