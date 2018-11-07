import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux'
import { token } from '../constants'
import { withRouter } from 'react-router-dom'
import { setHistory } from '../store/actions/users'
import {getContent} from '../store/actions/feed'





class Feed extends Component {


  componentDidMount() {
    if (token && !this.props.currentUser.email) {
      this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.email) {
      this.props.history.push('/')
    }
    this.props.getContent()
  }

  shouldComponentUpdate(nextProps){
    return this.props.currentUser === nextProps.currentUser ?  false :  true
  }


  render(){
    const { currentUser, content } = this.props
    return (
      <Fragment>
        {content ?
          <Fragment>
          <h1>{currentUser.name}'s Feed</h1>
          {content.map(x => <h1>{x.user}</h1>)}
        </Fragment>



        : <div className="spinner"></div>}
      </Fragment>
    )
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    },
    getContent: () => {
      return dispatch(getContent())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    content: state.feed.content
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
