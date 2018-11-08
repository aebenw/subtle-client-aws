import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


//Components
import Block from '../components/block/block'


//Actions
import { fetchBlock } from '../store/actions/blocks'
import {fetchUserInfo} from '../store/actions/users'


const BlockContainer = ({blocks, userShow, showBlock}) => {
  return (
  <div className="row">
    {blocks.map(block => <Block key={block.id} block={block} showBlock={showBlock}
    userShow={userShow}/>
    )}
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    showBlock: (block) => {
    return dispatch(fetchBlock(block))
  },
    userShow: (user) => {
    return dispatch(fetchUserInfo(user))
  }
  }
}

export default connect(null, mapDispatchToProps)(BlockContainer)
