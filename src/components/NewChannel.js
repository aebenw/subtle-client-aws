import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { createChannel } from '../store/actions/channels'



class NewChannel extends Component {

    state = {
      channel: {
        name: '',
      },
      users: [this.props.currentUser.id]
    }



  handleChange = (e) => {
    this.setState({
      channel: {
        ...this.state.channel,
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
      <div id="user-feed" className="row">
      <center>
      <div className="col-5-lg">
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
    <legend>New Channel</legend>
      <div className="input-group fluid">
      <div>
        <label>Name</label>
        <input type="text" name="name" onChange={(e) => this.handleChange(e)}/>
        <input type="submit"/>
      </div>
    </div>
  </fieldset>
</form>
</div>
</center>
</div>
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
    currentUser: state.users.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewChannel))
