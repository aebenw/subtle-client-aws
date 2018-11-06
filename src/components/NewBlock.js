import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { createBlock } from '../store/actions/blocks'



class NewBlock extends Component {

  constructor(props){
    super(props)
  this.state = {
    block: {
      content: '',
      user_id: this.props.currentUser.id,
    },
    channels:  [this.props.currentChannel.id]
  }}

  handleChange = (e) => {
    this.setState({
      block: {
        ...this.state.block,
      [e.target.name]: e.target.value
      }
    }, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // let copy = Object.assign({}, this.state)
    // debugger
    // copy.channel.users.push(this.props.currentUser.id)
    this.props.createBlock(this.state)
    .then(res => this.props.history.push(`/block/${res.block.id}`))
  }

  render(){
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>New Block</legend>
      <div className="input-group fluid">
      <div>
        <label>New Block Name</label>
        <input type="text" name="content" onChange={(e) => this.handleChange(e)}/>
        <input type="submit"/>
      </div>
    </div>
  </fieldset>
</form>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createBlock: (block, channels) => {
      return dispatch(createBlock(block, channels))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    currentChannel: state.channels.currentChannel
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlock))
