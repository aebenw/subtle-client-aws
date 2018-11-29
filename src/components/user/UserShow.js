import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//ACTIONS
import { fetchUserInfo } from '../../store/actions/users'

//COMPONENTS
import ProfileHeader from '../ProfileHeader'
import { UserContentContainer } from '../ContentContainer'
import ChangeView from '../buttons/ChangeView'
import Spinner from '../Spinner'

class UserShow extends Component {

  state = {
    view: 'Channels'
  }

  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, userShow, fetchUserInfo } = this.props

    if (!prevProps.currentUserId && currentUserId && !userShow){
      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)
      fetchUserInfo(id)
    }
    if(userShow !== prevProps.userShow){
      this.setState({
        view: 'Channels'
      })
    }
  }

  changeView = (change) => {
     return this.setState({
      view: change
    })
  }

  render() {
    const {userShow} = this.props
    const { view } = this.state
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <ProfileHeader user={userShow}/>
          <div className="row" style={{"margin-left": "2em"}}>
            <ChangeView content={"Channels"} changeView={this.changeView}/>
            <ChangeView content={"Friends"} changeView={this.changeView}/>
            <ChangeView content={"Followed Channels"} changeView={this.changeView}/>
          </div>
          <UserContentContainer user={userShow} view={view} />
        </Fragment>
      :
        <Spinner />
      }
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.users.currentUser.id,
    userShow: state.users.userShow
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (user) =>
    dispatch(fetchUserInfo(user))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))
