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
        let newArr = [...state.currentUser.channels, action.channel]

        return {...state, currentUser: {...state.currentUser, channels: newArr}}

      case "ADD_BLOCK":

      let copy = [...state.currentUser.channels]
      let channelId = action.block.channels[0].id
      let chan = copy.find(x => x.id === channelId)
      chan.blocks.push(action.block)
          // return {...state, currentUser: {...state.currentUser, channels: copy}}
          return {...state, channels: copy}


    default:
    return state;
  }
}
