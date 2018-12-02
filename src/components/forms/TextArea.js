import React from 'react'

const TextArea = ({ content, method }) => {
  return (
    <div style={{"position":"relative", "height": "7em", "padding-bottom": "1em"}}>
      <div className="row form-input">
        {/* <div className='col-5-lg'>
          <label>{content}</label>
          </div> */}
          <div className='col-12-lg' style={{ "position": "relative", "height": "7em", "padding-bottom": "1em", "justify-content": "center", "width": "100%"}}>
          <textarea type="text" name={content} style={{position: "relative", "left": "4px", "width": "95%", "height": "7em"}} placeholder={content} onChange={(e) => method(e)}></textarea>
        </div>
      </div>
  </div>
  )
}
const CommentTextArea = ({ method, content }) => {
  return (
    <div className="row">
      <div className='col-5-lg'>
        </div>
        <div className='col-5-lg'>
        <textarea type="text" name="content" style={{display:"inline"}} value={content} placeholder="Comment" onChange={(e) => method(e)}>
        </textarea>
      </div>
    </div>
  )
}


export {
  TextArea,
  CommentTextArea
}
