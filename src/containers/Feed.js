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
import { selectChannel } from '../store/actions/channels'
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


  shouldComponentUpdate(nextProps){
    return this.props.currentUser === nextProps.currentUser ?  false :  true
  }


  render(){
    const { currentUser, content, userShow, selectChannel, selectBlock } = this.props

    return (
      <Fragment>

        {content ?
          <Fragment>
          <h1>{currentUser.name}'s Feed</h1>
          <div className="row">

          {content.map(x => {
            if (x.authors){
              return (
                <Fragment>
                <h3>New Channel</h3>
                <Channel key={x.id} userShow={userShow} channel={x} selectChannel={selectChannel}/>
                </Fragment>
              )
            } else if (x.content){
              return (
                <Fragment>
                <h3>New Block</h3>
                <Block key={x.id} block={x} selectBlock={selectBlock}
              userShow={userShow}/>
              </Fragment>
              )
            } else if(x.email){
              return (
                <Fragment>
                <h3>New User</h3>
                <User key={x.id} user={x} userShow={userShow}/>
                </Fragment>
              )
            }

          }
          )}
        </div>
        </Fragment>



        : <div className="spinner"></div>}
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
    selectChannel: (channel) => {
      return dispatch(selectChannel(channel))
    },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    selectBlock: (block) => {
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
