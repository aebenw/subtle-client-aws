import { URL, HEADERS } from '../../constants'

export const selectChannel = (channel) => ({type: "SELECT_CHANNEL", channel})

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
        dispatch(selectChannel(r)),
        dispatch(addToUserChannel(r)))
    })
  }
}

export function fetchChannel(id){
  return (dispatch) => {
    return fetch(URL + `channels/${id}`)
    .then(r => r.json())
    .then(r => dispatch(selectChannel(r)))
  }
}
