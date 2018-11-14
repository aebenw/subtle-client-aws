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




  render(){
    const { currentUser } = this.props

    return (
      <Fragment>
      <div id="feed" className="row">
        <div className="col-lg-10">



        {currentUser.name ?
          <Fragment>
          <ProfileHeader info={currentUser.name} friends={currentUser.friends} channels={currentUser.channels}/>

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




    </div>
    </div>
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
