import React from 'react';
import { connect } from 'react-redux'

const Channel = props => {
  return(
    <div className="row">
    {props.channels.map(channel => {
      return (
        <div class="card">
          {channel.name}
        </div>)
        })
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => {
    return dispatch({type: "SELECT_CHANNEL", channel})
    }
  }
}

export default connect(null, mapDispatchToProps)(Channel);
