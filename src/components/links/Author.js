import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {fetchUserInfo} from '../../store/actions/users'

const Author = ({user, userShow, type}) => {
  return(
    <Link to={{pathname: `/users/${user.id}`, state: user.id}}>
    {type === "CARD" ?
    <p onClick={() => userShow(user.id)}>{user.name}</p>
    :
    <h3 onClick={() => userShow(user.id)}>{user.name}</h3>
    }
    </Link>
  )
}

const mapStateCard = (state) => {
  return {
    type: "CARD"
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
const TitleAuthor  = withRouter(connect(null, mapDispatch)(Author))

export {
  CardAuthor,
  TitleAuthor
}
