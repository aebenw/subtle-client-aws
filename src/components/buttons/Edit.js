import React from 'react'
import { Link } from 'react-router-dom'


const Edit = ({ content }) => {
  return (
    <Link to={`${content}/edit`}>
      <button className="inverse">Edit {content}</button>
    </Link>
  )
}

export default Edit
