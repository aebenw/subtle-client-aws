import React from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Block = ({block, blockShow, userShow}) => {
  return(
    <div  className="card user-card" >
      <Link to={{pathname:`/block/${block.id}`, state : block.id}}>
      <img src={block.file ? block.file : block.image} className="section media" onClick={() => blockShow(block.id)} alt="block"/>
      </Link>
      <div className="section author">
        <span style={{display :"inline"}}><p>Author: </p>
          <By key={block.id} user={block.author} userShow={userShow}/></span>
      </div>
  </div>
  )
}

export default Block
