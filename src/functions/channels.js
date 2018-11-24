import  React  from 'react'
import { Link } from 'react-router-dom'

export const appearsOn = (channels, showChannel) => {
  return channels.map(channel => {
    return (
      <Link to={`/channel/${channel.id}`}>
      <li onClick={() => showChannel(channel.id)}>{channel.name}</li>
      </Link>
    )
    }
  )
}
