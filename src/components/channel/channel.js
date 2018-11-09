import React from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Channel = ({channel, channelShow, userShow}) => {
  return(
      <div key={channel.name} className="card" >
        <div className="section" onClick={() => channelShow(channel)}>
          <Link to={{pathname: `/channel/${channel.name}`, state: channel.id}}>
          {channel.name}
          </Link>
        </div>
        <div className="section author">
          <p>Made by: </p>
          {channel.authors.map(author =>
            <By key={author.id} user={author} userShow={userShow}/>)}
        </div>
      </div>
    )


}

export default Channel
