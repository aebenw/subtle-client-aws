import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import ChannelContainer from '../containers/ChannelContainer'


const UserShow = (props) => {


  const { userShow } = props
    return (
      <Fragment>
        {userShow.name ?
          <Fragment>
          <h1>{userShow.name}'s Profile</h1>
          <ChannelContainer channels={userShow.channels} />
          </Fragment>
      :
      <div className="spinner"></div>
    }
    </Fragment>
    )
}

const mapStateToProps = (state) => {
  return {userShow: state.users.userShow}
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))
