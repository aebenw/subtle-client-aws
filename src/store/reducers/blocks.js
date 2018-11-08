export default function blockReducer(state = {}, action){
  switch(action.type){
    case "SELECT_BLOCK":
      return {...state, currentBlock: action.block};

      case "ADD_COMMENT":
        let altered = [...state.currentBlock.comments, action.comment]
        console.log(altered)
        return {...state, currentBlock: { ...state.currentBlock, comments: altered}}

    default:
    return state;
  }
}
