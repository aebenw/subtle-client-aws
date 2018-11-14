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
    <blockquote cite={comment.author.name}>{comment.content}</blockquote>
    </Fragment>
  )
}

export default CommentContainer
