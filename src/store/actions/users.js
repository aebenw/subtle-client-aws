import { URL, HEADERS } from '../../constants'

const errorAction = (error) => ({type: "LOGIN_ERROR", error})
const loginAction = (user) => ({ type: "LOGIN_USER", user})
export const setHistory = (setHistory) => ({type: "SET_HISTORY", setHistory})

const userShow = (user) => ({type: "USER_SHOW", user})

const addFriendToCurr = (user) => ({type: "ADD_FRIEND", user})
const rmFriendFromCurr = (user) => ({type: "RM_FRIEND", user})


export function loginUser(user) {
  return (dispatch) => {
    return fetch(URL + "/auth", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user)
    }).then(r => r.json())
      .then(user => {
        if(user.error) {dispatch(errorAction(user.error))}
        else {
          localStorage.setItem("jwt", user.jwt)
         dispatch(loginAction(user.user.user))
       }
      })
  }

}


export function createUser(user) {
  return (dispatch) => {
    return fetch(URL + "/users", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user)
    }).then(r => r.json())
      .then(user => {
        if(user.error) {dispatch(errorAction(user.error))}
        else {
          localStorage.setItem("jwt", user.jwt)
          dispatch(loginAction(user.user.user))
       }
    })
  }
}

export function fetchWithToken(token) {
  return (dispatch) => {
    return fetch(URL + "/current_user", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token
    }
  }).then(r => r.json())
    .then(user => {
      if(user.error) {dispatch(errorAction(user.error))}
      else {
       dispatch(loginAction(user))
     }
   })
  }
}

export function fetchUserInfo(user){
  return (dispatch) => {
    return fetch(URL + `users/${user}`)
    .then(r => r.json())
    .then(r => dispatch(userShow(r)))
  }
}

export function editUser(info, id){
  return (dispatch) => {
    return fetch(URL + `users/${id}`, {
      method: "PATCH",
      headers: HEADERS, 
      body: JSON.stringify(info)
    }).then(r => r.json())
      .then(r => dispatch(loginAction(r)))
  }
}

export function addFriend(currUser, user){
  const body = {
    relationship: {
      follower_id: currUser,
      followed_id: user
      }
    }
  return (dispatch) => {
    return fetch(URL + `relationships`,{
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body)
    }).then(r => r.json())
    .then(r => dispatch(addFriendToCurr(r)))
  }
}

export function rmFriend(currUser, user){
  const body = {
    relationship: {
      follower_id: currUser,
      followed_id: user
      }
    }
  return (dispatch) => {
    return fetch(URL + `relationships`,{
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify(body)
    }).then(r => r.json())
    .then(r => dispatch(rmFriendFromCurr(user)))
  }
}
