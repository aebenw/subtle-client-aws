import React,{Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectChannel } from '../store/actions/channels'

const Channel = props => {
  return(
    <Fragment>
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
      <div className="card">
      <Link to={`/channels/new`}>
        <h2>+++++</h2>
      </Link>
      </div>
    </div>
    </Fragment>
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
