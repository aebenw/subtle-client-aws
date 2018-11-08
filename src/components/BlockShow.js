import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//ACTIONS
import { createComment } from '../store/actions/blocks'

//COMPONENTS
import CommentContainer from '../containers/CommentContainer'




class BlockShow extends Component  {


  constructor(props){
    super(props)
    this.state = {
      comment: {
        content: '',
        user_id: this.props.userId,
        block_id: this.props.history.location.state
      }
    }
  }


  handleChange = (e) => {
    console.log(e)
    this.setState({
      comment: {
        ...this.state.comment,
      [e.target.name]: e.target.value
      }
    }, console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addComment(this.state)
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState !== this.state ? false : true
  }

  render(){
    const {currentBlock} = this.props
    return(
      <Fragment>
        { currentBlock ?
        <Fragment>
          <h1>{currentBlock.content}</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
          {currentBlock.comments ?
            <CommentContainer comments={currentBlock.comments} />
            : null}
          <textarea name="content" style={{display:"inline"}} placeholder="comment" onChange={(e) => this.handleChange(e)}></textarea>
          <input type="submit" value= "comment" />
          </form>
        </Fragment>
        : <div className="spinner"></div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBlock: state.blocks.currentBlock,
    userId: state.users.currentUser.id
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => {
      return dispatch(createComment(comment))
    }
  }

}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(BlockShow))
