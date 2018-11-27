import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { NO_PROFILE } from '../../constants'




const User = ({user, userShow, currentUser}) => {
  return user.id !== currentUser.id ?
  (
    <Fragment>
      <div key={user.id}  className="card user-card" onClick={() => userShow(user.id)}>
      <Link to={{pathname: `/users/${user.id}`, state: user.id}}>
      <img src={user.file ? user.file : NO_PROFILE} className="section media" alt="profile"/>
      </Link>
      <Link to={{pathname: `/users/${user.id}`, state: user.id}}>
        <div className="section author">
        {user.name}
      </div>
      </Link>
    </div>
  </Fragment>
  )
  : <CurrUserCard user={currentUser} />
}

const CurrUserCard = ({user}) => {
  return(
        <Fragment>
          <div key={user.id}  className="card user-card" >
          <Link to={{pathname: `/profile`}}>
          <img src={user.file ? user.file : NO_PROFILE} className="section media" alt="profile"/>
          </Link>
          <Link to={{pathname: `/users/${user.id}`, state: user.id}}>
            <div className="section author">
            {user.name}
          </div>
          </Link>
        </div>
      </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps)(User)
