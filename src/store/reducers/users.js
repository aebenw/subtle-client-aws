export default function userReducer(state = [], action){
  switch(action.type){
    case "LOGIN_USER":
    debugger
      return {...state, currentUser: action.user};

      case "LOGIN_ERROR":
      debugger
        return {...state, error: action.error}

    default:
    return state;
  }
}
