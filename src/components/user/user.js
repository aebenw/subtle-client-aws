import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'




const User = ({user, userShow}) => {

  return(
    <Fragment>
      <div key={user.id} className="card" onClick={() => userShow(user.id)}>
        <div className="section author">
        <Link to={{pathname: `/users/${user.name}`, state: user.id}}>
        {user.name}
      </Link>
      </div>
    </div>
  </Fragment>
  )
}

export default User
