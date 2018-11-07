import React from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Channel = ({channel, selectChannel, userShow}) => {
  return(
      <div key={channel.name} className="card" >
        <div className="section" onClick={() => selectChannel(channel)}>
          <Link to={`/channel/${channel.name}`}>
          {channel.name}
          </Link>
        </div>
        <div className="section">
          <p>Made by: </p>
          {channel.users.map(user =>
            <By key={user.id} user={user} userShow={userShow}/>)}
        </div>
      </div>
    )


}

export default Channel
