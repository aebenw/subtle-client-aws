import React from 'react'

const ChangeView = ({ changeView, content}) => {
  return (
    <div className="col-12-sm">
      <button className="button head-button" onClick={() => changeView(content)}>
        {content}
      </button>
    </div>
  )
}

export default ChangeView
