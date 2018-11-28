import React from 'react'
import { Link } from 'react-router-dom'

//Components
import { CardAuthor } from '../links/Author'

const Block = ({block, blockShow, userShow}) => {
  return(
    <div  className="card user-card" >
      <Link to={{pathname:`/block/${block.id}`, state : block.id}}>
      <img src={block.file ? block.file : block.image} className="section media" onClick={() => blockShow(block.id)} alt="block"/>
      </Link>
      <div className="section author">
        <span style={{display :"inline"}}><p>Author: </p>
          <CardAuthor user={block.author}/></span>
      </div>
  </div>
  )
}

export default Block
