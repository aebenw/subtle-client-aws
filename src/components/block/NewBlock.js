import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//ACTIONS
import { createBlock, attatchBlobToBlock } from '../../store/actions/blocks'

//COMPONENTS
import {FormInput} from '../forms/Input'
import {TextArea} from '../forms/TextArea'
import ASProvider from '../activestorage/Provider'

class NewBlock extends Component {

  constructor(props){
    super(props)
  this.state = {
    block: {
      name: '',
      content: '',
      user_id: this.props.currentUser.id,
      file: ''
    },
    channels:  [this.props.currentChannel.id],
    success: false
  }}

  handleChange = (e) => {
    let lowerCaseName = e.target.name.toLowerCase()

    this.setState({
      block: {
        ...this.state.block,
      [lowerCaseName]: e.target.value
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState !== this.state ? false : true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createBlock(this.state)
    .then(res => {
      return (
      this.props.history.state = res.id, this.props.history.push(`/block/${res.block.id}`)
      )
    })
  }

  response = (e) => {
    this.setState({
      block: {
        ...this.state.block,
      file: e.file.name
    }
  })
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
              <FormInput content={"Name"} method={this.handleChange}/>
              <TextArea content={"Content"} method={this.handleChange}/>
              <ASProvider method={this.response} model={"block"}/>
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
