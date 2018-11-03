import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectChannel } from '../store/actions/channels'

const Channel = props => {
  return(
    <div className="row">
    {props.channels.map(channel => {
      return (
        <div key={channel.name} className="card" onClick={() => props.selectChannel(channel)}>
          <Link to={`/channel/${channel.name}`}>
          {channel.name}
        </Link>
        </div>
        )
        })
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => {
    return dispatch(selectChannel(channel))
    }
  }
}

export default connect(null, mapDispatchToProps)(Channel);
