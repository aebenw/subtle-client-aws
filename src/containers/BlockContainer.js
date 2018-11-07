import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectBlock } from '../store/actions/blocks'
import {fetchUserInfo} from '../store/actions/users'


const BlockContainer = (props) => {
  return(
    <div className="row">
  {props.blocks.map(block => {
    return (
      <div key={block.block.id} className="card" >
      <div className="section" onClick={() => props.selectBlock(block.block)}>
        <Link to={`/block/${block.block.id}`}>
        {block.block.content}
        </Link>
      </div>
        <div className="section">
        <p> Author:
          <Link to={{pathname:`/users/${block.name}`, state: block.block.user_id}}>
          <span onClick={() => props.userShow(block.block.user_id)}>
            {block.name}</span>
      </Link>
      </p>
      </div>
    </div>
      )
    })}
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
