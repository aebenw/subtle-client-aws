import React from 'react'
import { Link } from 'react-router-dom'


const Edit = ({ content }) => {
  return (
    <div className="col-7-sm alter-btn">
    <Link to={`${content}/edit`}>
      <button className="inverse">Edit {content}</button>
    </Link>
  </div>
  )
}

export default Edit
