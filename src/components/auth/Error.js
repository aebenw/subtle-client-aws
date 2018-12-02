import React,{Fragment} from 'react'

const LoginError = ({error}) => {
  return(
    <div className="row" style={{
      "width":"100%",
      "align-items": "center",
      "justify-content": "center"
    }}>
      <div className="col-5-lg error">
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
      <div className="col-5-lg error">
        <h4>Sign Up Error</h4><br/>
            {errors(error)}
      </div>
    </div>
  )
}

const errors = (error) => {
  return (
    <ul>
      {error.password ?
        <li>
          <p>Password:</p><br/>
            <ul>{error.password.map(x =>
              <Fragment>
              <li>{x}</li><br/>
              </Fragment>
            )}</ul>
        </li>
      : null
      }
      {error.email ?
        <li>
          <p>Email:</p><br/>
            <ul>{error.email.map(x =>
              <Fragment>
            <li>{x}</li><br/>
            </Fragment>
          )}</ul>
        </li>
          : null
      }
      {error.name ?
        <li>
          <p>Name:</p><br/>
          <ul>{error.name.map(x =>
            <Fragment>
              <li>{x}</li><br/>
            </Fragment>)}</ul>
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
