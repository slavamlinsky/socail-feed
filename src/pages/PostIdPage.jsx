import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
    const params=useParams({})
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error]=useFetching(async (id) => {
        const responce = await PostService.getById(id);
        setPost(responce.data);
    });
    const [fetchComments, isComLoading, comError]=useFetching(async (id) => {
        const responce = await PostService.getCommentsByPostId(id);
        setComments(responce.data);
    });

    useEffect(() =>{
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

  return (
    <div>
        <h1>Вы открыли страницу поста c ID = {params.id}</h1>
        {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
        } 
        <br/><br/>
        <h3>Комментарии</h3>  
        {isComLoading
            ? <Loader/>
            : <div>
                {comments.map((comm) =>
                    <div style={{marginTop: '25px'}} key={comm.id}>
                        <h5>{comm.id}.{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
        }
        

    </div>
  )
}

export default PostIdPage