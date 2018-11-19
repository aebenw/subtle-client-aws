import { URL } from '../../constants'

const contentAction = (content) => ({type: "NEW_CONTENT", content})

export const getContent = () => {
  return (dispatch) => {
    return fetch(URL + "/content")
            .then(r => r.json())
            .then(r => {
              // debugger
              // r.content.forEach(x => x.file ? x.file = MINURL + x.file : x)
              // debugger
              return dispatch(contentAction(r))})
  }
}
