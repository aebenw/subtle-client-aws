import React from 'react'

const ProfilePic = (src) => {

  return (
    <div className="row">
      <div className="col-4-sm">
          <div  className="profile-pic">
            <img src={src} className="section media" alt="profile"/>
          </div>
        </div>
    </div>
  )
}

export default ProfilePic
