import React from 'react';
import { login } from '../actions/users'

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handSubmit = (e) => {
    e.preventDefault()


  }

  handleChange = (e) => {
    // debugger
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  render(){
    return(
      <form onSubmit={(e) => this.handSubmit(e)}>
        <h4>Email:</h4>
        <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="text">
        </input>
        <h4>Password:</h4>
        <input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} type="password">
        </input>
        <button type="submit">Log In</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
