import React from 'react'

const FollowUnfollow = ({content, method, currentUser, user}) => {
  return (
    <div className="col-sm-offset-7 alter-btn">
    <button onClick={method} className="inverse">{content}</button>
  </div>
  )
}

export default FollowUnfollow
