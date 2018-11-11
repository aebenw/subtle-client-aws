import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { token } from '../constants'
import { setHistory } from '../store/actions/users'
import ChannelContainer from './ChannelContainer'
import ActiveStorageProvider from 'react-activestorage-provider'
import Dropzone from "react-dropzone";
import { attatchBlobToBlock } from '../store/actions/blocks'


class Profile extends Component {
  state = {
    success: false,
    file: ''
  }

  componentDidMount() {
    if (token && !this.props.currentUser.name) {
    this.props.setHistory(this.props.history.location.pathname)
    }
    else if (!token && !this.props.currentUser.name) {
      this.props.history.push('/')
    }
  }

  response = (e) => {
    console.log(e)
    this.setState({
      success: true,
      file: e.file.name
    })
    e.state = null
  }


  render(){
    const { currentUser } = this.props
    const { file, success} = this.state
    // host: 'c3cb7511.ngrok.io',

    return (
      <Fragment>

            <ActiveStorageProvider
          endpoint={{
            path: `api/vi/users/${currentUser.id}`,
            model: 'User',
            host: "5e9c4f4a.ngrok.io",
            attribute: 'profile',
            method: 'PATCH'
          }}
          // headers={ {responseHeader: ['Content-Type', 'Content-Md5' ]}}
          // directUploadsPath={"/rail/active_storage/direct_uploads"}
          // onSuccess={(e) =>
          //   this.response(e)}
          // onSubmit={e =>
          //   this.response(e)}
          render={({ handleUpload, uploads, ready }) => (
            <div>
              <input
                type="file"
                disabled={!ready}
                onChange={e => {
                  return handleUpload(e.currentTarget.files)}}
              />

              {uploads.map(upload => {
                switch (upload.state) {
                  case 'waiting':
                    return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                  case 'uploading':
                    return (
                      <p key={upload.id}>
                        Uploading {upload.file.name}: {upload.progress}%
                      </p>
                    )
                  case 'error':
                    return (
                      <Fragment>
                      <p key={upload.id}>
                        Error uploading {upload.file.name}: {upload.error}
                        <button>Try again?</button>
                      </p>
                      </Fragment>
                    )
                  case 'finished':
                    return (
                      <Fragment>
                      {this.response(upload)}
                      <p key={upload.id}>Finished uploading {upload.file.name}</p>
                      </Fragment>)

                  default:
                  return null;
                }
              })}
              {success ?
              <button onClick={() => this.props.attatchBlob(file, currentUser.id)}> Upload</button> : null}
            </div>
          )}
        />
        {this.props.currentUser.name ?
          <Fragment>
          <h1>{currentUser.name}'s Profile</h1>
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

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => {
      return dispatch(setHistory(history))
    },
    attatchBlob: (file, id) => {
      dispatch(attatchBlobToBlock(file, id))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
