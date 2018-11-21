import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'




const User = ({user, userShow}) => {

  return(
    <Fragment>
      <div key={user.id}  className="card user-card" onClick={() => userShow(user.id)}>
      <Link to={{pathname: `/users/${user.name}`, state: user.id}}>
      <img src={user.file ? user.file : "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fuser-image-with-black-background_318-34564.jpg&f=1"} className="section media" alt="profile"/>
      </Link>
      <Link to={{pathname: `/users/${user.name}`, state: user.id}}>
        <div className="section author">
        {user.name}
      </div>
      </Link>
    </div>
  </Fragment>
  )
}

export default User
