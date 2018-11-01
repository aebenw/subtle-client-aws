import React, {Component, Fragment} from 'react'
import SignUp from '../components/SignUp'
import Login from '../components/Login'

export default class Home extends Component {


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
