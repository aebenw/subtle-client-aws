import React from 'react'

const Column = ({title, content}) => {
  return (
    <div className="col-6-sm">
    <h4 className="profile">{title}</h4>
      <p> {content} </p>
  </div>
  )
}

export default Column
