import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'
import ChannelContainer from './ChannelContainer'
import ProfileHeader from '../components/ProfileHeader'


class Profile extends Component {


  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }


  // <div id="feed" className="row">
  //   <div className="col-lg-10">


  render(){
    const { currentUser } = this.props

    return (
      <Fragment>




        {currentUser.name ?
          <Fragment>
          <ProfileHeader user={currentUser}/>


          <ChannelContainer channels={currentUser.channels} />
          <div className="card">
          <Link to={`/channels/new`}>
            <h2>+++++</h2>
          </Link>
          </div>
        </Fragment>
      :
      <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>
    }

    </Fragment>
    )
  }

}


// <a href="#modal">Modal</a>
//
// <section class="modal--show" id="modal-text" tabindex="-1"
// role="dialog" aria-labelledby="modal-label" aria-hidden="true">
//
// <div class="modal-inner">
// <header id="modal-label"><h4>hello there</h4></header>
// <div class="modal-content"><h4>hello there</h4></div>
// </div>
//
// <a href="#!" class="modal-close" title="Close this modal" data-close="Close"
// data-dismiss="modal">?</a>
// </section>


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
