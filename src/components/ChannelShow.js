import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import BlockContainer from '../containers/BlockContainer'


const ChannelShow = (props) => {

    const {currentChannel} = props
    console.log(currentChannel)
    return(
      <Fragment>
      <h1>{currentChannel.name}</h1>
      {currentChannel.blocks ?
      <BlockContainer blocks={currentChannel.blocks}/>
      : null
      }
      <Link to={`/blocks/new`}>
        <h2>+++++</h2>
      </Link>
      </Fragment>
    )
}

const mapStateToProps = (state) => {
  return { currentChannel: state.channels.currentChannel }
}

export default withRouter (connect(mapStateToProps)(ChannelShow))
