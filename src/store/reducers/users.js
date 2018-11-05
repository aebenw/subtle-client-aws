export default function userReducer(state = {currentUser: {}}, action){
  switch(action.type){
    case "LOGIN_USER":
      return {...state, currentUser: action.user};

      case "LOGIN_ERROR":
        return {...state, error: action.error};

      case "LOGOUT_USER":
        return {...state, currentUser: {}}

      case "SET_HISTORY":
        return {...state, setHistory: action.setHistory};

        case "ADD_CHANNEL":
        debugger
        return {...state, [state.currentUser.channels]: state.currentUser.channels.push(action.channel)}


    default:
    return state;
  }
}
