export default function feedReducer(state={}, action){
  switch(action.type){
    case "NEW_CONTENT":
    return {...state, feedContent: action.content, noFeed: null}

    case "NO_FEED":
    return {...state, feedContent: null, noFeed: action.content}


    default:
    return state
  }



}
