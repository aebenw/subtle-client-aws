export default function userReducer(state = [], action){
  switch(action.type){
    case "USER_LOGIN":
      return {...state, currentUser: action.user}

    default:
    return state;
  }

}
