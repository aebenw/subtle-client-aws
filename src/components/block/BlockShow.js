import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


//ACTIONS
import { createComment, addChannelBlock, fetchBlock } from '../../store/actions/blocks'


//COMPONENTS
import BlockPic from './BlockPic'
import AppearsOn from './AppearsOn'
import Spinner from '../Spinner'
import CommentForm from '../comments/CommentForm'

class BlockShow extends Component  {

  constructor(props){
    super(props)
    this.state = {
      value: '',
      options: [],
    }
  }

  componentDidMount() {
    if (!this.state.options && this.props.currentBlock){
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
    const { pathname } = this.props.history.location
    const { currentUserId, currentBlock, fetchBlock } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentBlock){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)
      fetchBlock(id)
    }
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
    const {currentBlock} = this.props
    return(
      <Fragment>
        { currentBlock ?
        <div id="block-feed" className="row  block-page">
          <BlockPic src={currentBlock.file ? currentBlock.file : currentBlock.image} />
          <div className="col-sm-5 block-form">
            <h4>{currentBlock.content}</h4>

            {this.state.options[0] ?
              <Fragment>
                <select value={this.state.value} onChange={(e) => this.handleSelectChange(e)}> {this.selectOptions()}
                </select>
                <button className="add-button" onClick={(e) => this.handleSelectSubmit(e)}>Add to Channel</button>
              </Fragment>
            : null}

            { currentBlock.channels ?
              <AppearsOn channels={currentBlock.channels}/>
            : null
            }

            <CommentForm />

          </div>
        </div>
        :
          <Spinner/>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBlock: state.blocks.currentBlock,
    currentUserId: state.users.currentUser.id,
    userChannels: state.users.currentUser.channels
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChannelBlock: (ids) => {
      return dispatch(addChannelBlock(ids))
    },
    fetchBlock: (block) =>
    dispatch(fetchBlock(block))
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(BlockShow))
