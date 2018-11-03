import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



class BlockShow extends Component {



  render(){
    const {currentBlock} = this.props
    console.log(currentBlock)
    return(
      <Fragment>
      <h1>{currentBlock.content}</h1>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentBlock: state.blocks.currentBlock }
}

export default withRouter (connect(mapStateToProps)(BlockShow))
