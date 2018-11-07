export default function feedReducer(state={}, action){
  switch(action.type){
    case "NEW_CONTENT":
    return {...state, feedContent: action.content.content, type: action.content.type}


    default:
    return state
  }



}
