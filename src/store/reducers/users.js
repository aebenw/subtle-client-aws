export default function userReducer(state = {currentUser: {}}, action){
  switch(action.type){
    case "LOGIN_USER":
      return {...state, currentUser: action.user};

      case "LOGIN_ERROR":
        return {...state, error: action.error};

      case "LOGOUT_USER":
        return {...state, currentUser: {}}

        case "USER_SHOW":
        return {...state, userShow: action.user}

      case "SET_HISTORY":
        return {...state, setHistory: action.setHistory};

      case "ADD_CHANNEL":
        let newArr = [...state.currentUser.channels, action.channel]

        return {...state, currentUser: {...state.currentUser, channels: newArr}}

      // case "ADD_BLOCK":
      // 
      // let copy = [...state.currentUser.channels]
      // let channelId = action.block.channels[0].id
      // let chan = copy.find(x => x.id === channelId)
      // chan.blocks.push(action.block)
      //     return {...state, currentUser: {...state.currentUser, channels: copy}}

      case "ADD_FRIEND":
      let newFriends = [...state.currentUser.friends, action.user]
      let notFriends = state.currentUser.not_friends.filter(x => x.id !== action.user.id)
        return {...state, currentUser: {...state.currentUser, friends: newFriends, not_friends: notFriends}}

      case "RM_FRIEND":
      let newNotFriends = [...state.currentUser.not_friends, action.user]
      let lessFriends = state.currentUser.friends.filter(x => x.id !== action.user.id)
        return {...state, currentUser: {...state.currentUser, friends: lessFriends, not_friends: newNotFriends}}



    default:
    return state;
  }
}
