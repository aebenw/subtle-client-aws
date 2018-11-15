import React,{Fragment} from 'react'



const CommentContainer = ({ comments }) => {


  return(
    <div className="col-12-lg">
      {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
      </div>
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
