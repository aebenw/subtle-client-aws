import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Block = ({block, showBlock, userShow}) => {
  return(
    <div  className="card" >
      <div className="section" onClick={() => showBlock(block.id)}>
      <Link to={{pathname:`/block/${block.id}`, state : block.id}}>
        {block.content}
      </Link>
    </div>
      <div className="section author">
        <span style={{display :"inline"}}><p>Author: </p>
          <By key={block.id} user={block.author} userShow={userShow}/></span>
      </div>
  </div>
  )
}

export default Block
