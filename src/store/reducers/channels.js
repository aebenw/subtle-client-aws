export default function channelReducer(state = {}, action){
  switch(action.type){
    case "SELECT_CHANNEL":
      return {...state, currentChannel: action.channel};

    case "ADD_BLOCK":
      let copy = [...state.currentChannel.blocks, action.block]
          return {...state, currentChannel: {...state.currentChannel, blocks: copy}}


    default:
    return state;
  }
}
