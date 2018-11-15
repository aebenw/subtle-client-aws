import React,{ Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { editUser } from '../../store/actions/users'

import { NGROK } from '../../constants/'

import ActiveStorageProvider from 'react-activestorage-provider'


class EditUser extends Component {

  constructor(props){
    super(props)
  this.state = {
    user: {
      id: props.currentUser.id,
      name: props.currentUser.name,
      description: props.currentUser.description,
      file: ''
    },
  }}

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
      [e.target.name]: e.target.value
      }
    }, () => console.log(this.state))
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextState !== this.state ? false : true
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editUser(this.state, this.props.currentUser.id)
    .then(res => this.props.history.push(`/profile`))
  }

  response = (e) => {
    console.log(e)
    this.setState({

      block: {
        ...this.state.user,
      file: e.file.name
    }
  }, console.log(this.state))
    // e.state = null
  }



  render(){
    return(
      <div id="user-feed" className="row">
      <div className="col-5-lg">
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>Edit Info</legend>
      <div className="input-group">
      <div className="row">
      <div className='col-5-lg'>
        <label>Name</label>
        </div>
        <div className='col-5-lg'>
        <input type="text" name="name" style={{"position": "relative",
    "left": "4px"}} onChange={(e) => this.handleChange(e)}/>
        </div>
        </div>
        <div className="row">
        <div className='col-5-lg'>
        <textarea style={{"position": "relative",
    "left": "63px"}} name="content" placeholder="description" onChange={(e) => this.handleChange(e)}></textarea>
        </div>
        </div>
        <div className="row">
        <div className='col-5-lg'>
        <label>Profile Picture</label>
        <ActiveStorageProvider
      endpoint={{
        path: `api/vi/blocks`,
        model: 'Blocks',
        host: NGROK,
        attribute: 'file',
        method: 'POST'
      }}
      // headers={ {responseHeader: ['Content-Type', 'Content-Md5' ]}}
      // directUploadsPath={"/rail/active_storage/direct_uploads"}
      onSuccess={(e) =>
        this.response(e)}
      onSubmit={e =>
        this.response(e)}
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
              debugger
                return (
                  <Fragment>
                  <p key={upload.id}>
                    Error uploading {upload.file.name}: {upload.error}
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
        </div>
      )}
    />
    </div>
    </div>



        <input type="submit"/>
      </div>
  </fieldset>
</form>
</div>
</div>
    )
  }
}


// ,
// attatchBlob: (file, id) => {
//   dispatch(attatchBlobToBlock(file, id))
// }

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (info) => {
      return dispatch(editUser(info))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser))
