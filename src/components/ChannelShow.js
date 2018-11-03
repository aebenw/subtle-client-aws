import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BlockContainer from '../containers/BlockContainer'


class ChannelShow extends Component {



  render(){
    const {currentChannel} = this.props
    console.log(currentChannel)
    return(
      <Fragment>
      <h1>{currentChannel.name}</h1>
      <BlockContainer blocks={currentChannel.blocks}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentChannel: state.channels.currentChannel }
}

export default withRouter (connect(mapStateToProps)(ChannelShow))
