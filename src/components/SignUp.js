import React from 'react';
import { createUser } from '../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';



class SignUp extends React.Component {

  state = {
    user: {
      email: '',
      name: '',
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
        <h4>Name:</h4>
        <input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} type="text">
        </input>
        <h4>Email:</h4>
        <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="text">
        </input>
        <h4>Password:</h4>
        <input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} type="password">
        </input>

        <button type="submit">Sign Up</button>
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
      return dispatch(createUser(user))
    }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(SignUp))
