import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'


import {lister} from '../functions'

import BlockContainer from '../containers/BlockContainer'
import {fetchUserInfo} from '../store/actions/users'
import {followChannel} from '../store/actions/channels'



const ChannelShow = (props) => {
    const {currentChannel, currentUserId, userShow, followChannel, isMine} = props
    return(
      <Fragment>
        {currentChannel ?
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-5-sm">
                  <h3> Channel </h3>
                  <h4 onClick={() => userShow(currentChannel.authors[0].id)}>{currentChannel.authors[0].name}/{currentChannel.name}</h4>
                </div>
              </div>

              { currentChannel.followers ?
              <div className="row">
                <div className="col-5-sm">
                  {lister(currentChannel.followers, userShow)}
                </div>
              </div>

                : null
              }

            </div>
          {!isMine() ?
            <div className="col-sm-offset-9">
          <button className="inverse" onClick={() => {followChannel(currentUserId, currentChannel.id)}}>Follow Channel</button>
          </div>
          : null
          }


            {currentChannel.blocks ?
              <BlockContainer blocks={currentChannel.blocks}/>
            : null
            }
            { isMine() || !currentChannel.private ? <Link to={`/blocks/new`}>
              <h2>+++++</h2>
            </Link>
            : null
            }
          </Fragment>
        : <center><div className="spinner tertiary"></div></center>
        }
      </Fragment>
    )
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
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
      followChannel: (user, channel) => {
        return dispatch(followChannel(user, channel))
      }

  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
