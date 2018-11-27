import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { createChannel } from '../../store/actions/channels'
import _ from "lodash"



class NewChannel extends Component {

    state = {
      channel: {
        name: '',
        user_id: this.props.currentUser.id
      },
      collab: ''
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
    .then(res =>{
      return this.props.history.push(`/channel/${res.channel.id}`)})
  }

  handleColabChange = (e) => {
    this.setState({
      collab: e.value
    }, () => this.state)

  }

  render(){
    const {collab} = this.state
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
        <label>Collaborators</label>
        <input type="text" name="collab" value={collab} onChange={_.debounce(this.handleColabChange, 300)}/>
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
