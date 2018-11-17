import React,{ Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { createBlock, attatchBlobToBlock } from '../store/actions/blocks'
import { NGROK } from '../constants'


import Dropzone from "react-dropzone";
import ActiveStorageProvider from 'react-activestorage-provider'




class NewBlock extends Component {

  constructor(props){
    super(props)
  this.state = {
    block: {
      content: '',
      user_id: this.props.currentUser.id,
      file: ''
    },
    channels:  [this.props.currentChannel.id],
    success: false
  }}

  handleChange = (e) => {
    this.setState({
      block: {
        ...this.state.block,
      [e.target.name]: e.target.value
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState !== this.state ? false : true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createBlock(this.state, this.props.isMine)
    .then(res => (
      this.props.history.state = res.id, this.props.history.push(`/block/${res.block.id}`))
    )
  }

  response = (e) => {
    console.log(e)
    this.setState({

      block: {
        ...this.state.block,
      file: e.file.name
    }
  }, console.log(this.state))
    e.state = null
  }



  render(){
    return(
      <div id="user-feed" className="row">
      <div className="col-5-lg">
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>New Block</legend>
      <div className="input-group">
      <div className="row">
      <div className='col-5-lg'>
        <label>Name</label>
        </div>
        <div className='col-5-lg'>
        <input type="text" name="content" style={{"position": "relative",
    "left": "4px"}} onChange={(e) => this.handleChange(e)}/>
        </div>
        </div>
        <div className="row">
        <div className='col-5-lg'>
        <textarea style={{"position": "relative",
    "left": "63px"}} name="content" placeholder="Content" onChange={(e) => this.handleChange(e)}></textarea>
        </div>
        </div>
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



        <input type="submit"/>
      </div>
  </fieldset>
</form>
</div>
</div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createBlock: (block, channels) => {
      return dispatch(createBlock(block, channels))
    },
    attatchBlob: (file, id) => {
      dispatch(attatchBlobToBlock(file, id))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
    currentChannel: state.channels.currentChannel,
    isMine: () => (
      state.users.currentUser.channels.find(x => x.id === ownProps.currentChannel.id) ? true : false
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlock))
