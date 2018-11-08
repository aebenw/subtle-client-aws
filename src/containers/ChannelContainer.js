import React,{Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//Components
import Channel from '../components/channel/channel'


//ACTIONS
import { selectChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'


const ChannelContainer = props => {
  return(
    <Fragment>
    <div className="row">
    {props.channels.map(channel => <Channel key={channel.id} userShow={props.userShow} channel={channel} selectChannel={props.selectChannel}/>)}
    </div>
    </Fragment>
  )
}


// IF USER IS ONE OF THE AUTHORS OF CHANNEL THEN RENDER ++ BUTTON
const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => {
    return dispatch(selectChannel(channel))
  },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChannelContainer);
