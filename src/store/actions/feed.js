import { URL, HEADERS } from '../../constants'

const contentAction = (content) => ({type: "NEW_CONTENT", content})

const noFeed = (content) => ({type: "NO_FEED", content})

export const getContent = (id) => {
  return (dispatch) => {
    return fetch(URL + `feeds/${id}`, {
      method: "GET",
      headers: HEADERS,
    })
    .then(r => {
      if(r.ok) {
        return r.json()
      } else{
        throw new Error()
      }
    })
    .then(r => dispatch(contentAction(r)))
    .catch(error => {
      let content = "No Friend Activity, Go to find Friends to add friends, see their channels to follow them or make some channels of your own on your profile page"
      return  dispatch(noFeed(content))
      })
  }
}
