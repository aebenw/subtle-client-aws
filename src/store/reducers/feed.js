export default function feedReducer(state={}, action){
  switch(action.type){
    case "NEW_CONTENT":
    return {...state, feedContent: action.content}


    default:
    return state
  }



}
