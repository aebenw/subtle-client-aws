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


  // shouldComponentUpdate(prevProps) {
  //   if(prevProps.currentUser.id === "undefined"){
  //     this.props.getContent(this.props.currentUser.id)
  //   }
  // }


  render(){
    const { content, userShow, channelShow, blockShow, currentUser } = this.props

    console.log(currentUser)

    return (
      <Fragment >
        <div id="user-feed" className="row">
          <div className="col-lg-10">
        {content ?
          <Fragment>


          <div id="feed" className="row">
          {content.map(x => {
            if (x.authors){

              return (
                <Fragment>
                <Channel key={x.id} userShow={userShow} channel={x} channelShow={channelShow}/>
                </Fragment>
              )
            } else if (x.content){

              return (
                <Fragment>
                <Block key={x.id} block={x} blockShow={blockShow}
              userShow={userShow}/>
              </Fragment>
              )
            } else if(x.email){

              return (
                <Fragment>
                <User key={x.id} user={x} userShow={userShow}/>
                </Fragment>
              )
            }

          }
          )}
          </div>
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
