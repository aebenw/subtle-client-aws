export default function channelReducer(state = {}, action){
  switch(action.type){
    case "SELECT_BLOCK":
      return {...state, currentBlock: action.block};

    default:
    return state;
  }
}
