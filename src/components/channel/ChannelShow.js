import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



//COMPONENTS
import ChannelHeader  from '../header/ChannelHeader'
import { ChannelContentContainer } from '../ContentContainer'
import ChangeView from '../buttons/ChangeView'
import Add from '../buttons/Add'
import Spinner from '../Spinner'


//ACTIONS
import { fetchChannel } from '../../store/actions/channels'




class ChannelShow extends Component {
    state = {
      view: "Blocks"
    }



  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, currentChannel } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentChannel){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)

      this.props.showChannel(id)
    }
  }

      changeView = (change) => {
         return this.setState({
          view: change
        })
      }


    render(){
    const { currentChannel, isMine } = this.props
    const { view } = this.state
    return(
      <Fragment>
        {currentChannel ?
          <Fragment>
            <ChannelHeader isMine={isMine} currentChannel={currentChannel}/>

            <div className="row" style={{"margin-left": "2em"}}>
              <ChangeView content={"Blocks"} changeView={this.changeView}/>
              <ChangeView content={"Followers"} changeView={this.changeView}/>
              { (isMine() || !currentChannel.private) && view === "Blocks" ?
                <Add content={"blocks"} />
                :
                null
              }
            </div>
            <ChannelContentContainer channel={currentChannel} view={view} />
          </Fragment>
        : <Spinner />
        }
      </Fragment>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
    isMine: () => state.channels.currentChannel.authors.find(x => x.id === state.users.currentUser.id) ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showChannel: (channel) =>
     dispatch(fetchChannel(channel))
  }
}


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
