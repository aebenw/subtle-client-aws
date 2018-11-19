import React from 'react'
import { connect } from 'react-redux'

//Components
import Block from '../components/block/block'


//Actions
import { fetchBlock } from '../store/actions/blocks'
import {fetchUserInfo} from '../store/actions/users'


const BlockContainer = ({blocks, userShow, blockShow}) => {
  return (
  <div id="feed" className="row">
    {blocks.map(block => <Block key={block.id} block={block} blockShow={blockShow}
    userShow={userShow}/>
    )}
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    blockShow: (block) => {
    return dispatch(fetchBlock(block))
  },
    userShow: (user) => {
    return dispatch(fetchUserInfo(user))
  }
  }
}

export default connect(null, mapDispatchToProps)(BlockContainer)
