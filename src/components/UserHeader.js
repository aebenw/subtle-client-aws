import React,{ Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const header = ({info}) => {
  return (
    <Fragment>
    <div className="container">
    <div className="row">
      <div className="col-5-sm">
        <h1>{info}</h1>
      </div>
    </div>
      <div className="row">
        <div className="col-3-sm">
          <h4>Channels</h4>
        </div>
        <div className="col-3-sm">
          <h4>Freinds</h4>
        </div>
        <div className="col-3-sm">
          <h4>Channels</h4>
        </div>
      </div>
    </div>
    </Fragment>
  )

}





export default withRouter(header)
