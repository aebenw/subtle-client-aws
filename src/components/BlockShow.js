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
        comment: {
          content: '',
          user_id: this.props.userId,
          block_id: this.props.history.location.state
        }
      },
      select: ''
    }
  }



  // options = () => {
  //   let arr = []
  //   this.props.userChannels.map(chan => {
  //     let option = {
  //       value: `${chan.id}`, label: `${chan.name}`
  //     }
  //     return arr.push(option)
  //   })
  // }

  options = () => {
    return this.props.userChannels.map(chan => {
      return(
        <option value={chan.id}>{chan.name}</option>
      )
    })
  }


  handleCommentChange = (e) => {
    console.log(e)
    this.setState({
      comment: {
        comment: {
        ...this.state.comment.comment,
      [e.target.name]: e.target.value
      }}
    }, console.log(this.state))
  }

  handleSelectSubmit = () => {
     console.log(this.state.select)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    debugger
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
          <select>
            {this.options()}
          </select>

          <form onSubmit={(e) => this.handleFormSubmit(e)}>
          {currentBlock.comments ?
            <CommentContainer comments={currentBlock.comments} />
            : null}
          <textarea name="content" style={{display:"inline"}} placeholder="comment" onChange={(e) => this.handleCommentChange(e)}></textarea>
          <input type="submit" value={this.state.comment.content} />
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
    userId: state.users.currentUser.id,
    userChannels: state.users.currentUser.channels
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
