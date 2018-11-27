import React, { Component, Fragment } from 'react';
import { createUser } from '../../store';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';



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
    this.setState({
      user: {
      ...this.state.user,
      [e.target.name]: e.target.value
    }
    })
  }

  errors = () => {
    const { error } = this.props
    return (
      <ul>
        {error.password ?
          <li>
            <p>Password:</p>
              <ul>{error.password.map(x => <li>{x} </li>)}</ul>
          </li>
        : null
        }
        {error.email ?
          <li>
            <p>Email:</p>
              {error.email.map(x => <p>{x}</p>)}
          </li>
            : null
        }
        {error.name ?
          <li>
            <p>Name:</p>
            {error.name.map(x => <p>{x}</p>)}
          </li>
          : null
        }
      </ul>
    )
  }

  render(){
    const { error } = this.props
    const { name, email, password } = this.state
    return(
      <Fragment>
      <div id="user-feed" className="row">
        { error ?
          <div className="row" style={{"width":"100%",   "align-items": "center",
            "justify-content": "center"}}>
          <div className=" error">

          <h4>Sign Up Error<span><p> {this.errors()}</p></span></h4>
        </div>
        </div>
        : null
      }
      <div className="col-5-lg">
      <form onSubmit={(e) => this.handSubmit(e)}>
        <fieldset>
        <label>Name:</label>
        <input onChange={(e) => this.handleChange(e)} name="name" value={name} type="text">
        </input>
        <label>Email:</label>
        <input onChange={(e) => this.handleChange(e)} name="email" value={email} type="text">
        </input>
        <label>Password:</label>
        <input onChange={(e) => this.handleChange(e)} name="password" value={password} type="password">
        </input>

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
