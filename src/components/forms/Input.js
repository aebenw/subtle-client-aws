import React from 'react'

const FormInput = ({ content, method }) => {
  return (
    <div className="row">
      <div className='col-5-lg'>
        <label>{content}:</label>
        </div>
        <div className='col-3-sm' style={{"position": "relative",
  "right": "4px"}}>
        <input type="text" name={content}  onChange={(e) => method(e)}/>
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
        <div className='col-sm-3' style={{"position": "relative",
  "right": "-32px"}}>
        <input type="password" name='password'  onChange={(e) => method(e)}/>
      </div>
    </div>
  )
}

export {
  FormInput,
  Password
}
