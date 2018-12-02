import React from 'react'

const FormInput = ({ content, method }) => {
  return (
    <div style={{"position":"relative"}}>
      <div className="row form-input" >
        <div className='col-5-lg' style={{"padding-top": "8px", "paddingLeft":"3px"}}>
          <label>{content}:</label>
          </div>
          <div className='col-3-sm' style={{"position": "absolute", "right": "6px"}}>
          <input type="text" name={content}  onChange={(e) => method(e)}/>
        </div>
      </div>
    </div>
  )
}

// const Password = ({ content, method }) => {
//   return (
//     <div className="row">
//       <div className='col-5-lg'>
//         <label>Password:</label>
//         </div>
//         <div className='col-sm-3' style={{"position": "relative",
//   "right": "-32px"}}>
//         <input type="password" name='password'  onChange={(e) => method(e)}/>
//       </div>
//     </div>
//   )
// }
const Password = ({ content, method }) => {
  return (
    <div style={{"position":"relative"}}>
      <div className="row form-input">
        <div className='col-5-lg' style={{"padding-top": "8px", "paddingLeft":"3px"}}>
          <label>Password:</label>
          </div>
          <div className='col-3-sm' style={{"position": "absolute", "right": "6px"}}>
          <input type="password" name='password'  onChange={(e) => method(e)}/>
        </div>
      </div>
    </div>
  )
}

export {
  FormInput,
  Password
}
