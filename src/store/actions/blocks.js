import { URL, HEADERS } from '../../constants'

export const selectBlock = (block) => ({type: "SELECT_BLOCK", block})

export const addBlockToChannel = (block) => ({type:"ADD_BLOCK", block })
export const addCommentToBlock = (comment) => ({type:"ADD_COMMENT", comment })
export const addChannelToBlock = (channel) => ({type: "ADD_CHANNEL_BLOCK", channel})



export function createBlock(block) {
  return (dispatch) => {
    return fetch(URL + "blocks", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(block)
    }).then(r => r.json())
    .then(r => {
      return (dispatch(selectBlock(r)),
      dispatch(addBlockToChannel(r)))
    })
  }
}

export function fetchBlock(block){
  return (dispatch) => {
    return fetch(URL + `blocks/${block}`)
    .then(r => r.json())
    .then(r => dispatch(selectBlock(r)))
  }
}

export function addChannelBlock(ids){
  return (dispatch) => {
    return fetch(URL + `ChannelBlock`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(ids)
    })
    .then(r => r.json())
    .then(r => {
      return dispatch(addChannelToBlock(r))
    })
  }
}



export function createComment(comment) {
  return (dispatch) => {
    return fetch(URL + "comments", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(comment)
    }).then(r => r.json())
    .then(r => {
      return (dispatch(addCommentToBlock(r)))
    })
  }
}

export function attatchBlobToBlock(file, id) {
  let body = {
    block: {
      file: file
    }
  }
  return (dispatch) => {
    return fetch(URL + `blocks/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(r => {
      return dispatch(selectBlock(r))})
  }
}
