import React,{ Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectBlock } from '../store/actions/blocks'

const BlockContainer = (props) => {
  return(
    <div className="row">
  {props.blocks.map(block => {
    return (
      <div key={block.id} className="card" onClick={() => props.selectBlock(block)}>
        <Link to={`/block/${block.id}`}>
        {block.content}
      </Link>
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
    }
  }
}

export default connect(null, mapDispatchToProps)(BlockContainer)
