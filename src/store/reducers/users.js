export default function userReducer(state = [], action){
  switch(action.type){
    case "LOGIN_USER":
      return {...state, currentUser: action.user};

      case "LOGIN_ERROR":
        return {...state, error: action.error}

    default:
    return state;
  }
}
