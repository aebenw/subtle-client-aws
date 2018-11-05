import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { createChannel } from '../store/actions/channels'



class NewBlock extends Component {

  state = {
    channel: {
      name: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      channel: {
      [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createChannel(this.state)
    .then(res => this.props.history.push(`/channel/${res.channel.name}`))
  }

  render(){
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
    <legend>New Channel</legend>
      <div className="input-group fluid">
      <div>
        <label>New Channel Name</label>
        <input type="text" name="name" onChange={(e) => this.handleChange(e)}/>
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
    createChannel: (channel) => {
      return dispatch(createChannel(channel))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlock))
