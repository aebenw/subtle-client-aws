import React from 'react';
import { loginUser } from '../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

class Login extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state)
    .then(() => this.props.history.push('/home'))
    // .then(r => this.props.history.push('/home'))

  }

  handleChange = (e) => {
    // debugger
    this.setState({
      user: {
      ...this.state.user,
      [e.target.name]: e.target.value
    }
    })
  }

  render(){
    return(
      <React.Fragment>
        <h1>Login</h1>
      <form onSubmit={(e) => this.handSubmit(e)}>
        <h4>Email:</h4>
        <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="text">
        </input>
        <h4>Password:</h4>
        <input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} type="password">
        </input>
        <button type="submit">Log In</button>
      </form>
    </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      return dispatch(loginUser(user))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
