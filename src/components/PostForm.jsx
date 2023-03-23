import React, {useState} from 'react'
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';


const PostForm = ({create}) => {

  const [post, setPost] = useState({title:'', body:''})

  const addNewPost = (e) => {
    e.preventDefault()
    
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
   
    setPost({title:'', body:''})    
  }

  return (
    <form>
        {/* Управляемый компонент */}
        <h2 style={{textAlign: 'center'}}>Добавление нового поста</h2>
        <MyInput 
          value={post.title} 
          onChange={e => setPost({...post, title: e.target.value})}
          placeholder='Заголовок поста'
        />
        {/* Неуправляемый компонент */}
        <MyInput 
          value={post.body} 
          onChange={e => setPost({...post, body: e.target.value})}
          type="text" placeholder='Описание поста'/>
        
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
  )
}

export default PostForm