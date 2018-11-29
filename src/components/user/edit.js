import React,{ Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { editUser } from '../../store/actions/users'

//COMPONENTS
import {FormInput} from '../forms/Input'
import {TextArea} from '../forms/TextArea'

import ASProvider from '../activestorage/Provider'


class EditUser extends Component {

  constructor(props){
    super(props)
  this.state = {
    user: {
      id: props.currentUser.id,
      name: props.currentUser.name,
      description: props.currentUser.description,
      profile: ''
    },
  }}

  handleChange = (e) => {
    let lowerCaseName = e.target.name.toLowerCase()

    this.setState({
      user: {
        ...this.state.user,
      [lowerCaseName]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editUser(this.state, this.props.currentUser.id)
    .then(res => this.props.history.push(`/profile`))
  }

  response = (e) => {
    this.setState({

      user: {
        ...this.state.user,
      profile: e.file.name
    }
  })
    e.state = null
  }



  render(){
    return(
      <div id="user-feed" className="row">
        <div className="col-5-lg">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <fieldset>
              <legend>Edit Info</legend>
              <div className="input-group">
                <FormInput content={"Name"} method={this.handleChange}/>
                <TextArea content={"Description"} method={this.handleChange}/>
                <ASProvider method={this.response} model={'user'} />
                <input type="submit"/>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (info) => {
      return dispatch(editUser(info))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser))
