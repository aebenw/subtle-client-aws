export default function channelReducer(state = {}, action){
  switch(action.type){
    case "SELECT_CHANNEL":
      return {...state, currentChannel: action.channel};

    case "ADD_BLOCK":
    return {...state, [state.currentChannel.blocks]: state.currentChannel.blocks.push(action.block)}

    default:
    return state;
  }
}
