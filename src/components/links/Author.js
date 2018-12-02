import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {fetchUserInfo} from '../../store/actions/users'

const Author = ({user, userShow, type, currentUserId}) => {
  return user.id !== currentUserId ?
    <Link to={{pathname: `/users/${user.id}`, state: user.id}}>
    {tagType(user, type, userShow)}
    </Link>
  :
    <Link to={{pathname: `/profile`}}>
    {authorTagType(user, type)}
    </Link>

}

const tagType = (user, type, userShow) => {
  switch(type){
    case "CARD" :
      return (
        <div onClick={() => userShow(user.id)} className="section author">
        {user.name}
        </div>);

    case "COL":
      return (<h4 style={{"margin": "0"}} onClick={() => userShow(user.id)}>{user.name}</h4>);

    default:
      return (<h3  onClick={() => userShow(user.id)}>{user.name}</h3>);
    }

}
const authorTagType = (user, type, userShow) => {
  switch(type){
    case "CARD" :
      return (
      <div className="section author">
          {user.name}
        </div>
      );

    case "COL":
      return (<h4 style={{"margin": "0"}}>{user.name}</h4>);

    default:
      return (
          <h3>{user.name}</h3>
      );
    }

}

const mapStateCard = (state) => {
  return {
    currentUserId: state.users.currentUser.id,
    type: "CARD"
  }
}
const mapStateCol = (state) => {
  return {
    currentUserId: state.users.currentUser.id,
    type: "COL"
  }
}

const mapDispatch = (dispatch) => {
  return {
      userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

const CardAuthor  = withRouter(connect(mapStateCard, mapDispatch)(Author))
const ColAuthor  = withRouter(connect(mapStateCol, mapDispatch)(Author))
const TitleAuthor  = withRouter(connect(null, mapDispatch)(Author))

export {
  CardAuthor,
  TitleAuthor,
  ColAuthor
}
