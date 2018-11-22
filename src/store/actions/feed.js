import { URL, HEADERS } from '../../constants'

const contentAction = (content) => ({type: "NEW_CONTENT", content})

export const getContent = (id) => {
  return (dispatch) => {
    return fetch(URL + `feeds/${id}`, {
      method: "GET",
      headers: HEADERS,
    })
            .then(r => r.json())
            .then(r => {
              return dispatch(contentAction(r))})
  }
}
