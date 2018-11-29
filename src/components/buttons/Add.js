import React from 'react'
import { Link } from 'react-router-dom'

const Add = ({ content }) => {
  return (
    <div className="col-sm-offset-5" style={{ "marginLeft": "15.7em"}}>

      <Link to={`/${content}/new`}>
      <button className="inverse" >+++++</button>
      </Link>
    </div>
  )
}

export default Add
