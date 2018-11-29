import { URL, HEADERS } from '../../constants'

export const showChannel = (channel) => ({type: "SELECT_CHANNEL", channel})
export const addFollower = (user) => ({type: "ADD_FOLLOWER", user})
export const rmFollower = (user) => ({type: "RM_FOLLOWER", user})
export const addFollowedChannel = (channel) => ({type: "ADD_FOLLOWED_CHANNEL", channel})
export const rmFollowedChannel = (channel) => ({type: "RM_FOLLOWED_CHANNEL", channel})
export const addToUserChannel  = (channel) => ({ type: "ADD_CHANNEL", channel})
export const rmCurrChannel  = () => ({ type: "RM_CURR_CHANNEL"})
export const rmChannelFromUser  = (channelId) => ({ type: "DELETE_CHANNEL", channelId})

export function createChannel(channel){
  return (dispatch) => {
    return fetch(URL + "channels", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(channel)
    })
    .then(r => r.json())
    .then(r => {
      return (
        dispatch(showChannel(r)),
        dispatch(addToUserChannel(r))
      )
    })
  }
}

export function fetchChannel(channel){
  return (dispatch) => {
    return fetch(URL + `channels/${channel}`)
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
    .then(r => {
      return (
        dispatch(addFollower(r.user)),
        dispatch(addFollowedChannel(r.channel))
      )
    })
  }
}
export function unFollowChannel(user, channel){
  let body = {
    channel: {
      id: channel,
      user_id: user
    }
  }

  return (dispatch) => {
    return fetch(URL + `channels/followers`, {
      method: `DELETE`,
      headers: HEADERS,
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(r => {
      return (
        dispatch(rmFollower(r.user)),
        dispatch(rmFollowedChannel(r.channel))
      )
    })
  }
}

export function deleteChannel(channel){
  return (dispatch) => {
    return fetch(URL + `channels/${channel}`, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify(channel)
    }).then(() =>
      dispatch(rmChannelFromUser(channel))
    )
  }

}
