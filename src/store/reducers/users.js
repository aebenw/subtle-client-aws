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
      let notFriends = state.currentUser.not_friends.filter(x => x.id !== action.user)
        return {...state, currentUser: {...state.currentUser, friends: newFriends, not_friends: notFriends}}

      case "RM_FRIEND":
      let newNotFriends = [...state.currentUser.not_friends, action.user]
      let lessFriends = state.currentUser.friends.filter(x => x.id !== action.user)
        return {...state, currentUser: {...state.currentUser, friends: lessFriends, not_friends: newNotFriends}}

      case "ADD_FOLLOWED_CHANNEL":
      let followed_channels = [...state.currentUser.channel_follow, action.channel]
      return  {...state, currentUser: {...state.currentUser, followed_channel: followed_channels}};

      case "RM_FOLLOWED_CHANNEL":
      let filteredFollow = state.currentUser.channel_follow.filter(x => x.id !== action.channel.id)
      return  {...state, currentUser: {...state.currentUser, followed_channel: filteredFollow}};

      case "DELETE_CHANNEL":
        let filtered = state.currentUser.channels.filter(x => x.id !== action.channelId)
        return {...state, currentUser: {...state.currentUser, channels: filtered}};




    default:
    return state;
  }
}
