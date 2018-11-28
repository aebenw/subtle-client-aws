import React from 'react'

const TextArea = ({ content, method }) => {
  return (
    <div className="row">
      <div className='col-5-lg'>
        <label>{content}</label>
        </div>
        <div className='col-5-lg'>
        <textarea type="text" name={content} style={{"position": "relative",
    "right": "4px"}} placeholder={content} onChange={(e) => method(e)}></textarea>
      </div>
    </div>
  )
}

export default TextArea
