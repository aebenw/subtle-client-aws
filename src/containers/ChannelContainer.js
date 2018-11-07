import React,{Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'


const ChannelContainer = props => {
  return(
    <Fragment>
    <div className="row">
    {props.channels.map(channel => {
      return (
        <div key={channel.name} className="card" >
          <div className="section" onClick={() => props.selectChannel(channel)}>
            <Link to={`/channel/${channel.name}`}>
            {channel.name}
            </Link>
          </div>
          <div className="section">
            <p> Made by:
            {channel.users.map(user =>
            <Link key={user.id} to={{pathname:`/users/${user.name}`, state: user.id}}>
             {user.name}
          </Link>
              )}
            </p>
          </div>
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
