import React,{Fragment} from 'react'



const CommentContainer = ({ comments }) => {


  return(
    <Fragment>
      {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
    </Fragment>
  )

}

const Comment = ({ comment }) => {
  return(
    <Fragment>
      <p>{comment.content}</p>
      <p>Author {comment.author.name}</p>

    </Fragment>
  )
}

export default CommentContainer
