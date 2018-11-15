import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import By from './user/by'

import BlockContainer from '../containers/BlockContainer'
import {fetchUserInfo} from '../store/actions/users'



const ChannelShow = (props) => {
    const {currentChannel, userShow, isMine} = props
    return(
      <Fragment>
      {currentChannel ?
      <Fragment>
      {currentChannel.authors.map(author => <By key={author.id} user={author} userShow={userShow}/>)}/{currentChannel.name}

      {currentChannel.blocks ?
      <BlockContainer blocks={currentChannel.blocks}/>
      : null
      }
      { isMine() || !currentChannel.private ? <Link to={`/blocks/new`}>
        <h2>+++++</h2>
      </Link>
      : null

    }
    </Fragment>
    : <center><div style={{"margin-top": "10em"}} className="spinner tertiary"></div></center>
    }
  </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
    isMine: () => state.channels.currentChannel.authors.find(x => x.id === state.users.currentUser.id) ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
