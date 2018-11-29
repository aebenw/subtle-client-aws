import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createComment } from '../../store/actions/blocks'

import CommentContainer from '../../containers/CommentContainer'
import {CommentTextArea} from '../forms/TextArea'

class CommentForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      comment: {
        content: '',
        user_id: this.props.currentUserId,
        block_id: this.props.currentBlock.id
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addComment(this.state)
    this.setState({
        comment: {
          ...this.state.comment,
          content: ''
      }
    })
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: {
        ...this.state.comment,
      [e.target.name]: e.target.value
      }
    })
  }

  render(){
    const {content} = this.state.comment
    const { currentBlock } = this.props
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        {currentBlock.comments ?
        <CommentContainer comments={currentBlock.comments} />
        :
          null
        }
        <CommentTextArea content={content} method={this.handleCommentChange} />
        <input type="submit" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.users.currentUser.id,
    currentBlock: state.blocks.currentBlock

  }
}

const mapDispatchToProps = (dispatch) => {
   return {
    addComment: (comment) => {
      return dispatch(createComment(comment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
