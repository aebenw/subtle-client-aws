import  React  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchChannel } from '../../store/actions/channels'


const AppearsOn = ({channels, showChannel}) => {
  return (
    <ul className="list">
      <h2>Appears on: </h2>
        {channels.map(channel => {
          return (
            <Link key={channel.id} to={`/channel/${channel.id}`}>
              <li onClick={() => showChannel(channel.id)}>{channel.name}</li>
            </Link>
          )
        })
      }
    </ul>
    )
  }


const mapDispatch = (dispatch) => {
  return {
    showChannel: (channel) => {
      return dispatch(fetchChannel(channel))
    }
  }
}

export default connect(null, mapDispatch)(AppearsOn)
