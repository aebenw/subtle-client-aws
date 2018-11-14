import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


//ACTIONS
import { createComment, addChannelBlock } from '../store/actions/blocks'
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
      options: ''
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
    }

  selectOptions = () => {
    return this.state.options.map(chan => {
    return(<option key={chan.id} value={chan.id}>{chan.name}</option>)
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.currentBlock !== prevProps.currentBlock){
      let difference = this.options()
      this.setState({
        ...this.state,
          options: difference
      })
    }
  }

  options = () => {
    console.log(this.state)
    let channelIds = this.props.currentBlock.channels.map(x => x.id)
    return this.props.userChannels.filter(x => !channelIds.includes(x.id))
    }



  handleSelectSubmit = (e) => {
    e.preventDefault()
    let copy = [...this.state.options]
    let filtered = copy.filter(x => x.id != this.state.value)

    this.setState({
      ...this.state,
      options: filtered
    })

    let body = {
      channel_block:{
      channel_id: this.state.value,
      block_id: this.state.comment.comment.block_id
      }
    }
    this.props.addChannelBlock(body)
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: {
        comment: {
          content: ''
      }}
    })
  }

  //IDEALLY, CLICK A BUTTON WHICH THEN ALLOWS FOR A DROPDOWN

  handleSelectChange = (e) => {
    this.setState({
      value: e.target.value
    })

  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.setState({
      comment: {
        comment: {
        ...this.state.comment.comment,
      [e.target.name]: e.target.value
      }}

    })
    this.props.addComment(this.state.comment)
  }


  appearsOn = () => {
    return this.props.currentBlock.channels.map(channel => {
      return (
        <Link to={`/channel/${channel.name}`}>
        <li onClick={() => this.props.showChannel(channel)}>{channel.name}</li>
        </Link>
      )
      }
    )
  }

  media = () => {
    return (
      <div id="block-img"><img src={this.props.currentBlock.file ? this.props.currentBlock.file : this.props.currentBlock.image} className="section media" /></div>
    )
  }

  render(){
    const {currentBlock} = this.props
    console.log(currentBlock, "block show render")
    console.log(this.state, "state block show render")
    return(
      <Fragment>
        { currentBlock ?

        <div id="feed" className="row  block-page">
          <div className="col-4-lg">
          {this.media()}
          </div>

          <div className="col-sm-4 block-form">
          <h4>{currentBlock.content}</h4>
          <select value={this.state.value} onChange={ this.handleSelectChange}>
            {this.state.options ? this.selectOptions() : null}
          </select>
          <button className="add-button" onClick={(e) => this.handleSelectSubmit(e)}>Add to Channel</button>
          <Fragment>
          { currentBlock.channels ?
          <ul>
            <h2>Appears on: </h2>
              {this.appearsOn()}
          </ul>
          : null
          }
          </Fragment>


          <form onSubmit={(e) => this.handleFormSubmit(e)}>
          {currentBlock.comments ?
            <CommentContainer comments={currentBlock.comments} />
            : null}
          <textarea name="content" style={{display:"inline"}} placeholder="comment" onChange={(e) => this.handleCommentChange(e)}></textarea>
          <input type="submit" value={this.state.comment.content} />
          </form>
        </div>
        </div>
        : <center><div style={{"marginTop": "10em"}} className="spinner tertiary"></div></center>
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
    },
    addChannelBlock: (ids) => {
      return dispatch(addChannelBlock(ids))
    },
    showChannel: (channel) => {
      return dispatch(fetchChannel(channel))
    }
  }

}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(BlockShow))
