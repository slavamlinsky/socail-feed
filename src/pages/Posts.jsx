import React, { useState, useEffect, useRef } from 'react';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton'
import MyModal from '../components/UI/MyModal/MyModal';
import {usePosts} from '../hooks/usePosts'

import PostService from '../API/PostService';
import '../styles/App.css'
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';




function Posts() {
  const [posts,setPosts] = useState([])

  
  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState (false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  
  

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);          
    const totalCount=response.headers['x-total-count'];    
    
    setTotalPages(getPagesCount(totalCount, limit));    
    //console.log(totalPages);
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () =>{
    setPage(page + 1);
  })
  
   useEffect(() => {
       fetchPosts(limit, page)
   }, [page, limit])

  
  

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page)
  }


 
  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
      
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Добавить пост  
      </MyButton>

      <MyModal visible={modal} setVisible={setModal} >
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>
      
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать всё'}
        ]}
      />
      {postError &&
        <h2 style={{textAlign: 'center'}}>Произошла ошибка ${postError}</h2>        
      }
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов"/>
      <div ref={lastElement} style={{height: '5px', backgroundColor: '#FF000003'}}></div>
      
      {isPostsLoading && 
        <div style={{marginTop: 50, justifyContent: 'center', display: 'flex'}}><Loader/></div>
        
      }
      
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages} 
      />
    
    </div>
  );
}

export default Posts;
