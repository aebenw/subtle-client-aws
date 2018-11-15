import React from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Channel = ({channel, channelShow, userShow}) => {
  return(
      <div key={channel.name} className="card  channel-card" >
      <Link to={{pathname: `/channel/${channel.name}`, state: channel.id}}>
        <div className="section" style={{"padding-top": "40%"}}onClick={() => channelShow(channel)}>
          {channel.name}
        </div>
        </Link>
        <div className="section author">
          {channel.authors.map(author =>
            <By key={author.id} user={author} userShow={userShow}/>)}
        </div>
      </div>
    )


}

export default Channel
