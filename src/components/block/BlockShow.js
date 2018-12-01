import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


//ACTIONS
import { fetchBlock } from '../../store/actions/blocks'


//COMPONENTS
import BlockPic from './BlockPic'
import AppearsOn from './AppearsOn'
import Spinner from '../Spinner'
import CommentForm from '../comments/CommentForm'
import ChannelSelect from './ChannelSelect'

class BlockShow extends Component  {


  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, currentBlock, fetchBlock } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentBlock){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)
      fetchBlock(id)
    }
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
              <ChannelSelect />
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
    currentUserId: state.users.currentUser.id
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlock: (block) =>
    dispatch(fetchBlock(block))
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(BlockShow))
