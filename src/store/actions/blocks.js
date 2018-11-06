import { URL, HEADERS } from '../../constants'

export const selectBlock = (block) => ({type: "SELECT_BLOCK", block})

//for now, doing one block for one channel
export const addBlockToChannel = (block) => ({type:"ADD_BLOCK", block })

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
