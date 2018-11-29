import React,{Fragment} from 'react';
import { connect } from 'react-redux'

//Components
import Channel from '../components/channel/channel'


//ACTIONS
import { fetchChannel } from '../store/actions/channels'

const ChannelContainer = ({channels, channelShow}) => {
  return(
    <Fragment>

    {channels ?
      <Fragment>
        <div id="feed" className="row">
          {channels.map(channel => <Channel key={channel.id} channel={channel} channelShow={channelShow}/>)}
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
    }
  }
}

export default connect(null, mapDispatchToProps)(ChannelContainer);
