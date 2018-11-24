import React,{Fragment} from 'react';
import { connect } from 'react-redux'

//Components
import Channel from '../components/channel/channel'


//ACTIONS
import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'


const ChannelContainer = props => {
  return(
    <Fragment>

    {props.channels ?
      <Fragment>
        <div id="feed" className="row">
    {props.channels.map(channel => <Channel key={channel.id} userShow={props.userShow} channel={channel} channelShow={props.channelShow}/>)}
  </div>
    </Fragment>
    : <h4>No Channels</h4>
    }
    </Fragment>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    channelShow: (channel) => {
    return dispatch(fetchChannel(channel))
  },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChannelContainer);
