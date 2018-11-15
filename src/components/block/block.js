import React from 'react'
import { Link } from 'react-router-dom'

//Components
import By from '../user/by'

const Block = ({block, blockShow, userShow}) => {
  return(
    <div  className="card user-card" >
      <Link to={{pathname:`/block/${block.id}`, state : block.id}}>
      <img src={block.file ? block.file : block.image} className="section media" onClick={() => blockShow(block)}/>
      </Link>
      <div className="section author">
        <span style={{display :"inline"}}><p>Author: </p>
          <By key={block.id} user={block.author} userShow={userShow}/></span>
      </div>
  </div>
  )
}

export default Block



// import React from 'react'
// import { Link } from 'react-router-dom'

// //Components
// import By from '../user/by'
//
// const Block = ({block, blockShow, userShow}) => {
//   return(
//     <div  className="card" >
//       <div className="section" onClick={() => blockShow(block)}>
//       <Link to={{pathname:`/block/${block.id}`, state : block.id}}>
//         {block.content}
//       </Link>
//     </div>
//       <div className="section author">
//         <span style={{display :"inline"}}><p>Author: </p>
//           <By key={block.id} user={block.author} userShow={userShow}/></span>
//       </div>
//   </div>
//   )
// }
//
// export default Block
