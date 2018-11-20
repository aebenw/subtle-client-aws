export default function channelReducer(state = {}, action){
  switch(action.type){
    case "SELECT_CHANNEL":
      return {...state, currentChannel: action.channel};

    case "ADD_BLOCK":
      let copy = [...state.currentChannel.blocks, action.block]
          return {...state, currentChannel: {...state.currentChannel, blocks: copy}};

    case "ADD_FOLLOWER":
      let followers = [...state.currentChannel.followers, action.user]
        return {...state, currentChannel: {...state.currentChannel, followers: followers}};

    case "RM_FOLLOWER":
      let filteredFollowers = state.currentChannel.followers.filter(x => x.id !== action.user.id)
        return {...state, currentChannel: {...state.currentChannel, followers: filteredFollowers}};

      case "RM_CURR_CHANNEL":
        return {...state, currentChannel: {}};


    default:
    return state;
  }
}
