import React, { Fragment, Component } from 'react';
import { loginUser } from '../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

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
    this.setState({
      user: {
      ...this.state.user,
      [e.target.name]: e.target.value
    }
    })
  }

  render(){
    const { email, password } = this.state
    const { error } = this.props
    return(
      <Fragment>
      <div id="user-feed" className="row">
        { error ?
          <div className="row" style={{"width":"100%",   "align-items": "center",
            "justify-content": "center"}}>
          <div className=" error">

          <h4>Login Error<span><p>- {error}</p></span></h4>
        </div>
        </div>
        : null
      }
      <div className="row">
      <div className="col-5-lg">
        <form onSubmit={(e) => this.handSubmit(e)}>
          <fieldset>
            <legend>Log In</legend>
            <label>Email:</label>
            <input onChange={(e) => this.handleChange(e)} name="email" value={email} type="text">
            </input>
            <label>Password:</label>
            <input onChange={(e) => this.handleChange(e)} name="password" value={password} type="password">
            </input>
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
