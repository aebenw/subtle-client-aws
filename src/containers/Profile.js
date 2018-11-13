import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'
import ChannelContainer from './ChannelContainer'
import Dropzone from "react-dropzone";


class Profile extends Component {


  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }




  render(){
    const { currentUser } = this.props

    return (
      <Fragment>


        {this.props.currentUser.name ?
          <Fragment>
          <div className="row">
            <div className ="col-sm-2">
          <h1>{currentUser.name}'s Profile</h1>
          </div>
          <ChannelContainer channels={currentUser.channels} />
          <div className="card">
          <Link to={`/channels/new`}>
            <h2>+++++</h2>
          </Link>
          </div>
          </div>
        </Fragment>
      :
      <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>
    }





    </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
