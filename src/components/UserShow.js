import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ChannelContainer from '../containers/ChannelContainer'
import UserHeader from '../components/UserHeader'




const UserShow = ({ userShow }) => {
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <UserHeader userShow={userShow}/>
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
