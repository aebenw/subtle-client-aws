import React from 'react'
import {Link} from 'react-router-dom'


const By = ({user, userShow}) => {
  return (
    <p key={user.id} onClick={() => userShow(user.id)}>
      <Link to={{pathname: `/users/${user.name}`, state: user.id}}>
      {user.name}
    </Link>
  </p>
  )
}

export default By
