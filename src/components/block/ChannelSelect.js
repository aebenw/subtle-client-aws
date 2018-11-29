import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { addChannelBlock } from '../../store/actions/blocks'

class ChannelSelect extends Component {

  constructor(){
    super()
    this.state = {
      value: '',
      options: []
    }
  }

  componentDidMount() {
    if (!this.state.options[0] && this.props.currentBlock){
      if (this.props.currentBlock.channels){
        let difference = this.options()
        let value = difference[0] ? difference[0].id : ''

        this.setState({
          ...this.state,
            options: difference,
            value: value
          })
        }
      }
    }

  componentDidUpdate(prevProps){
    const { currentBlock } = this.props

    if(prevProps.currentBlock && (currentBlock.id !== prevProps.currentBlock.id)){
      let difference = this.options()
      let value = difference[0] ? difference[0].id : ''

      this.setState({
        ...this.state,
          options: difference,
          value: value
      })
    }
  }

  selectOptions = () => {
    return this.state.options.map(chan => {
      return(<option key={chan.id} value={chan.id}>{chan.name}</option>)
    })
  }

  options = () => {
    let channelIds = this.props.currentBlock.channels.map(x => x.id)
    return this.props.userChannels.filter(x => !channelIds.includes(x.id))
    }

  handleSelectSubmit = (e) => {
    e.preventDefault()

    const {currentBlock, addChannelBlock} = this.props
    let copy = [...this.state.options]
    let filtered = copy.filter(x => x.id !== this.state.value)
    let value = filtered[0] ? filtered[0].id : ''

    this.setState({
        ...this.state,
        options: filtered,
        value: value
      })

    let body = {
      channel_block: {
      channel_id: this.state.value,
      block_id: currentBlock.id
      }
    }
    addChannelBlock(body)

  }

  handleSelectChange = (e) => {
    let numberValue = parseInt(e.target.value)
    this.setState({
      ...this.state,
      value: numberValue
    })

  }

  render(){
    return this.state.options[0] ?
    (
      <Fragment>
        <select value={this.state.value} onChange={(e) => this.handleSelectChange(e)}> {this.selectOptions()}
        </select>
        <button className="add-button" onClick={(e) => this.handleSelectSubmit(e)}>Add to Channel</button>
      </Fragment>
    )
    : null
  }

}

const mapState = (state) => {
  return {
    currentBlock: state.blocks.currentBlock,
    userChannels: state.users.currentUser.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
    addChannelBlock: (ids) => {
      return dispatch(addChannelBlock(ids))
    }
  }
}

export default connect(mapState, mapDispatch)(ChannelSelect)
