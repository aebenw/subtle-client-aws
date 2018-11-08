import React,{ Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



const BlockShow = (props) =>  {

    const {currentBlock} = props
    return(
      <Fragment>
      <h1>{currentBlock.content}</h1>
      <textarea></textarea>
      </Fragment>
    )
}

const mapStateToProps = (state) => {
  return { currentBlock: state.blocks.currentBlock }
}

export default withRouter (connect(mapStateToProps)(BlockShow))
