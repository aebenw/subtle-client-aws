import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ChannelContainer from '../containers/ChannelContainer'
import ProfileHeader from '../components/ProfileHeader'




const UserShow = ({ userShow }) => {
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <ProfileHeader user={userShow}/>
          <ChannelContainer channels={userShow.channels} />
        </Fragment>
      :
      <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>
    }
    </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    userShow: state.users.userShow
  }
}


export default withRouter(connect(mapStateToProps)(UserShow))
