import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//COMPONENTS
import ProfileHeader from '../components/ProfileHeader'
import { UserContentContainer } from '../components/ContentContainer'
import ChangeView from '../components/buttons/ChangeView'
import Add from '../components/buttons/Add'
import Spinner from '../components/Spinner'



class Profile extends Component {
  state = {
    view: "Channels"
  }

  changeView = (change) => {
     return this.setState({
      view: change
    })
  }

  render(){
    const { currentUser } = this.props
    const { view } = this.state
    return (
      <Fragment>
        {currentUser.name ?
          <Fragment>
          <ProfileHeader user={currentUser}/>
          <div style={{"position":"relative"}}>
            <div className="row" style={{"margin-left": "2em"}}>
              <ChangeView content={"Channels"} changeView={this.changeView}/>
              <ChangeView content={"Friends"} changeView={this.changeView}/>
              <ChangeView content={"Followed Channels"} changeView={this.changeView}/>

              { view === "Channels" ?
              <Add content={"channels"} />
              : null
              }
            </div>
          </div>
          <UserContentContainer user={currentUser} view={view} />
        </Fragment>
        :
        <Spinner />
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



export default withRouter(connect(mapStateToProps)(Profile))
