import React, { Fragment, Component } from 'react';
import { loginUser } from '../../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import { FormInput, Password } from '../forms/Input'
import { LoginError } from '../forms/Error'


class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { history, currentUser } = this.props
    return prevProps.currentUser !== currentUser ? history.push('/home') : null
  }

  handSubmit = (e) => {
    const { login, history, currentUser } = this.props
    e.preventDefault()
    login(this.state)
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
          <LoginError error={error} />
        : null
        }
      <div className="row">
        <div className="col-5-lg">
          <form onSubmit={(e) => this.handSubmit(e)}>
            <fieldset>
              <legend>Log In</legend>
              <FormInput content={"Email"} method={this.handleChange}/>
              <Password method={this.handleChange}/>
              <button type="submit">Log In</button>
            </fieldset>
          </form>
        </div>
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
    login: (user) => {
      return dispatch(loginUser(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
