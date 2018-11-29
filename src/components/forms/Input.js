import React from 'react'

const FormInput = ({ content, method }) => {
  return (
    <div className="row">
      <div className='col-5-lg'>
        <label>{content}:</label>
        </div>
        <div className='col-sm-offset-3'>
        <input type="text" name={content} style={{"position": "relative",
  "right": "4px"}} onChange={(e) => method(e)}/>
      </div>
    </div>
  )
}

const Password = ({ content, method }) => {
  return (
    <div className="row">
      <div className='col-5-lg'>
        <label>Password:</label>
        </div>
        <div className='col-sm-offset-3'>
        <input type="password" name='password' style={{"position": "relative",
  "right": "4px"}} onChange={(e) => method(e)}/>
      </div>
    </div>
  )
}

export {
  FormInput,
  Password
}
