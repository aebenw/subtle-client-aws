import React from 'react';
import { login } from '../store';
import { connect } from "react-redux";

class SignUp extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json())
      .then(console.log)

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
        <h1>Sign Up</h1>
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
/////////// Not Sure about what to dispatch after a singup ///////////

//
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user))
    }
  }
}


export default connect(null, mapDispatchToProps)(SignUp)
