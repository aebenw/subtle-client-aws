import React from 'react';
import { createUser } from '../store';
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
    this.props.createUser(this.state)
    .then(() => this.props.history.push('/home'))
  }

  handleChange = (e) => {
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
    createUser: (user) => {
      dispatch(createUser(user))
    }
  }
}


export default connect(null, mapDispatchToProps)(SignUp)
