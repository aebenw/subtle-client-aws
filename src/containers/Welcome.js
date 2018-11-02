import React, {Component, Fragment} from 'react'
import SignUp from '../components/SignUp'
import Login from '../components/login'

export default class Welcome extends Component {


  render(){
    return (
      <Fragment>
        <h1>home sweet home</h1>
        <Login />
        <SignUp />
      </Fragment>
    )
  }
}
