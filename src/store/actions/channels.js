import { URL, HEADERS } from '../../constants'

export const showChannel = (channel) => ({type: "SELECT_CHANNEL", channel})

export const addFollower = (user) => ({type: "ADD_FOLLOWER", user})

export const addFollowedChannel = (channel) => ({type: "ADD_FOLLOWED_CHANNEL", channel})

/////////// ADDING A NEW CHANNEL TO USER'S CHANNEL /////

export const addToUserChannel  = (channel) => ({ type: "ADD_CHANNEL", channel})


export function createChannel(channel){
  return (dispatch) => {
    return fetch(URL + "channels", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(channel)
    }).then(r => r.json())
    .then(r => {
      return (
        dispatch(showChannel(r)),
        dispatch(addFollower(r)))
    })
  }
}

export function fetchChannel(channel){
  return (dispatch) => {
    return fetch(URL + `channels/${channel.id}`)
    .then(r => r.json())
    .then(r => dispatch(showChannel(r)))
  }
}


export function followChannel(user, channel){
  let body = {
    channel: {
      id: channel,
      user_id: user
    }
  }

  return (dispatch) => {
    return fetch(URL + `channels/followers`, {
      method: `POST`,
      headers: HEADERS,
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(r => dispatch(addFollower(r)))
  }
}
