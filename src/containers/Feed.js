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
    this.props.getContent()
  }


  // shouldComponentUpdate(nextProps){
  //   return this.props.currentUser === nextProps.currentUser ?  false :  true
  // }


  render(){
    const { currentUser, content, userShow, channelShow, blockShow } = this.props


    console.log(content[0].image)

    return (
      <Fragment >
        <div id="feed" className="row">
          <div className="col-lg-5">
        {content ?
          <Fragment>
            {currentUser.name ?
          <h1>{currentUser.name}'s Feed</h1>
          : null}

          <div className="row">
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



        : <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>}
      </div>
      </div>
      </Fragment>
    )
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    },
    getContent: () => {
      return dispatch(getContent())
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
