import React from 'react'
import { useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PostItem from './PostItem'

const PostList = ({posts, title, remove}) => {
  const nodeRef= useRef();

  if(!posts.length){
    return (
      <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
    )
  }
  return (
    <div>
        <h1 style={{textAlign:'center'}}>{title}</h1>
        <TransitionGroup>          
        {posts.map((post, index) => 
          <CSSTransition
            nodeRef={nodeRef}
            key={post.id}
            timeout={500}
            classNames="post"
          >       
            <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>         
          </CSSTransition>                        
            )}    

        </TransitionGroup>
        
    </div>
  )
}

export default PostList