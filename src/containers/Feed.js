import React from 'react';
import { connect } from 'react-redux'
import { fetchWithToken } from '../store/actions/users'
import { token } from '../constants'




class Feed extends React.Component {


  componentDidMount() {
    console.log(token)
    token ? this.props.fetchWithToken(token) : this.history.push('/home')
  }

  render(){
    return (
      <h1>FEED</h1>
    )
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    fetchWithToken: (token) => {
      return dispatch(fetchWithToken(token))
    }
  }
}

export default connect(null, mapDispatchToProps)(Feed)
