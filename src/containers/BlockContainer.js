import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


//Components
import Block from '../components/block/block'


//Actions
import { selectBlock } from '../store/actions/blocks'
import {fetchUserInfo} from '../store/actions/users'


const BlockContainer = ({blocks, userShow, selectBlock}) => {
  return (
  <div className="row">
    {blocks.map(block => <Block key={block.id} block={block} selectBlock={selectBlock}
    userShow={userShow}/>
    )}
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectBlock: (block) => {
    return dispatch(selectBlock(block))
  },
    userShow: (user) => {
    return dispatch(fetchUserInfo(user))
  }
  }
}

export default connect(null, mapDispatchToProps)(BlockContainer)
