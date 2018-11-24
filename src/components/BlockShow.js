import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


//ACTIONS
import { createComment, addChannelBlock, fetchBlock } from '../store/actions/blocks'
import { fetchChannel } from '../store/actions/channels'


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
      value: '',
      options: [],
      appearsOn: this.props.channels
    }
  }


  componentDidMount() {
    if (!this.state.options && this.props.currentBlock){
      if (this.props.currentBlock.channels){
        let difference = this.options()
        this.setState({
          ...this.state,
            options: difference
          })
        }
      }
      if(this.props.currentBlock){
        this.setState({
          comment: {
            comment: {
              ...this.state.comment.comment,
              block_id: this.props.currentBlock.id
            }
          }
        })
      }
    }



  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, currentBlock, fetchBlock } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentBlock){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)
      this.setState({
        comment:{
          comment:{
            ...this.state.comment.comment,
            block_id: id
          }
        }
      })

      fetchBlock(id)
    }


    if(currentBlock !== prevProps.currentBlock){
      let difference = this.options()
      this.setState({
        ...this.state,
          options: difference,
      })
    }
  }

  selectOptions = () => {
    return this.state.options.map(chan => {
      return(<option key={chan.id} value={chan.id}>{chan.name}</option>)
    })
  }

  options = () => {
    let channelIds = this.props.currentBlock.channels.map(x => x.id)
    return this.props.userChannels.filter(x => !channelIds.includes(x.id))
    }



  handleSelectSubmit = (e) => {
    e.preventDefault()
    let copy = [...this.state.options]
    let chanId = parseInt(this.state.value)
    let filtered = copy.filter(x => x.id != chanId)

    this.setState({
      ...this.state,
      options: filtered
    })

    let body = {
      channel_block: {
      channel_id: chanId,
      block_id: this.state.comment.comment.block_id
      }
    }
    this.props.addChannelBlock(body)
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: {
        comment: {
        ...this.state.comment.comment,
      [e.target.name]: e.target.value
      }}

    })
  }


  handleSelectChange = (e) => {
    this.setState({
      value: e.target.value
    })

  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.addComment(this.state.comment)
    this.setState({
      comment: {
        comment: {
          ...this.state.comment.comment,
          content: ''
      }}
    })

  }


  appearsOn = () => {
    return this.props.currentBlock.channels.map(channel => {
      return (
        <Link key={channel.id} to={`/channel/${channel.id}`}>
        <li onClick={() => this.props.showChannel(channel.id)}>{channel.name}</li>
        </Link>
      )
      }
    )
  }

  media = () => {
    return (
      <div id="block-img"><img src={this.props.currentBlock.file ? this.props.currentBlock.file : this.props.currentBlock.image} className="section media"  alt="block"/></div>
    )
  }

  render(){
    const {currentBlock} = this.props
    return(
      <Fragment>
        { currentBlock ?

        <div id="block-feed" className="row  block-page">
          <div className="row">
          <div className="col-4-lg">
          {this.media()}
          </div>

          <div className="col-sm-5 block-form">
          <h4>{currentBlock.content}</h4>

          {this.state.options[0] ?
            <Fragment>
          <select value={this.state.value} onChange={ this.handleSelectChange}> {this.selectOptions()}
          </select>
          <button className="add-button" onClick={(e) => this.handleSelectSubmit(e)}>Add to Channel</button>
          </Fragment>
          : null}
          <Fragment>
          { currentBlock.channels ?
          <ul className="list">
            <h2>Appears on: </h2>
              {this.appearsOn()}
          </ul>
          : null
          }
          </Fragment>


          <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div>
          {currentBlock.comments ?
            <CommentContainer comments={currentBlock.comments} />
            : null}
          </div>
          <textarea name="content" value={this.state.comment.comment.content} style={{display:"inline"}} placeholder="comment" onChange={(e) => this.handleCommentChange(e)}></textarea>
          <input type="submit" />
          </form>
        </div>
        </div>
              </div>

        : <center><div className="spinner tertiary"></div></center>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBlock: state.blocks.currentBlock,
    userId: state.users.currentUser.id,
    currentUserId: state.users.currentUser.id,
    userChannels: state.users.currentUser.channels
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => {
      return dispatch(createComment(comment))
    },
    addChannelBlock: (ids) => {
      return dispatch(addChannelBlock(ids))
    },
    showChannel: (channel) => {
      return dispatch(fetchChannel(channel))
    },
    fetchBlock: (block) =>
    dispatch(fetchBlock(block))
  }

}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(BlockShow))
