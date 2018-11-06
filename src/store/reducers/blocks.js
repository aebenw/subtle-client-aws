export default function blockReducer(state = {}, action){
  switch(action.type){
    case "SELECT_BLOCK":
    debugger
      return {...state, currentBlock: action.block};

    default:
    return state;
  }
}
