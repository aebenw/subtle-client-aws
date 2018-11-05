export default function channelReducer(state = {}, action){
  switch(action.type){
    case "SELECT_CHANNEL":
    debugger
      return {...state, currentChannel: action.channel};

    // case "NEW_CHANNEL":
    //   return {...state, currentChannel: action.channel};

    default:
    return state;
  }
}
