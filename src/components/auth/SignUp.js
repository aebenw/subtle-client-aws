import React, { Component, Fragment } from 'react';
import { createUser } from '../../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { FormInput, Password } from '../forms/Input'

import { SignUpError } from '../forms/Error'


class SignUp extends Component {

  state = {
    user: {
      email: '',
      name: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { history, currentUser } = this.props
    return prevProps.currentUser !== currentUser ? history.push('/home') : null
  }

  handSubmit = (e) => {
    const { createUser, history, currentUser } = this.props
    e.preventDefault()
    createUser(this.state)
    .then(() => {
      return currentUser.email ? history.push('/home') : null
    })
  }

  handleChange = (e) => {
    let lowerCaseName = e.target.name.toLowerCase()

    this.setState({
      user: {
      ...this.state.user,
      [lowerCaseName]: e.target.value
    }
    })
  }

  render(){
    const { error } = this.props
    return(
      <Fragment>
        <div id="user-feed" className="row">
          { error ?
            <SignUpError error={error} />
          : null
          }
          <div className="col-5-lg">
            <form onSubmit={(e) => this.handSubmit(e)}>
              <fieldset>
                <FormInput content={"Name"} method={this.handleChange}/>
                <FormInput content={"Email"} method={this.handleChange}/>
                <Password  method={this.handleChange}/>
                <button type="submit">Sign Up</button>
              </fieldset>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    error: state.users.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      return dispatch(createUser(user))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
