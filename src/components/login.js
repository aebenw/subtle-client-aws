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
      <div id="user-feed" className="row">
      <div className="col-5-lg">
        <form onSubmit={(e) => this.handSubmit(e)}>
          <fieldset>
            <legend>Log In</legend>
            <label>Email:</label>
            <input onChange={(e) => this.handleChange(e)} name="email" value={this.state.email} type="text">
            </input>
            <label>Password:</label>
            <input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} type="password">
            </input>
            <button type="submit">Log In</button>
        </fieldset>
      </form>
      </div>
      </div>
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
