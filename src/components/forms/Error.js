import React from 'react'

const LoginError = ({error}) => {
  return(
    <div className="row" style={{
      "width":"100%",
      "align-items": "center",
      "justify-content": "center"
    }}>
      <div className="error">
        <h4>Login Error<span><p>- {error}</p></span></h4>
      </div>
    </div>
  )
}

const SignUpError = ({error}) => {
  return(
    <div className="row" style={{
      "width":"100%",
      "align-items": "center",
      "justify-content": "center"
    }}>
      <div className=" error">
        <h4>Sign Up Error
          <span>
            <p>{errors(error)}</p>
          </span>
        </h4>
      </div>
    </div>
  )
}

const errors = (error) => {
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

export {
  SignUpError,
  LoginError
}
