import React from 'react'

const Column = ({title, content}) => {
  return (
    <div className="col-6-sm">
    <h3 className="profile">{title}</h3>
      <h4 className="col-text"> {content} </h4>
  </div>
  )
}

export default Column
