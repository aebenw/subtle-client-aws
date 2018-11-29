import React from 'react'


const BlockPic = ({src}) => {
  return (
    <div className="col-4-lg">
      <div id="block-img">
        <img src={src} className="section media"  alt="block"/>
      </div>
    </div>
  )
}

export default BlockPic
