import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//ACTIONS
import { createChannel } from '../../store/actions/channels'

//COMPONENTS
import {FormInput} from '../forms/Input'
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
    let lowerCaseName = e.target.name.toLowerCase()
    this.setState({
      channel: {
        ...this.state.channel,
      [lowerCaseName]: e.target.value
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
    return(
      <div id="user-feed" className="row">
        <center>
          <div className="col-5-lg">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <fieldset>
              <legend>New Channel</legend>
              <div className="input-group fluid">
                <FormInput content={"Name"} method={this.handleChange}/>
              </div>
              <input type="submit"/>
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


        // <label>Collaborators</label>
        // <input type="text" name="collab" value={collab} onChange={_.debounce(this.handleColabChange, 300)}/>
