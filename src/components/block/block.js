import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Block = ({block, selectBlock, userShow}) => {
  // if (block.block){
  //   block = block.block
  // }

  return(
    <div  className="card" >
      <div className="section" onClick={() => selectBlock(block.block)}>
      <Link to={`/block/${block.block.id}`}>
        {block.block.content}
      </Link>
      <div className="section">
        <span style={{display :"inline"}}><p>Author: </p>
          <By key={block.block.id} user={block.user} userShow={userShow}/></span>
      </div>
    </div>
  </div>
  )
}

export default Block
