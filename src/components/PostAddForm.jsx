import {useState} from "react";

function PostAddForm({create, postsCount}) {

  const [post, setPost] = useState({title: '', body: ''})

  function addNewPost(e) {
    e.preventDefault()
    const newPost = {
      ...post, id: postsCount
    }
    if (post.title !== '' && post.body !== '') {
      create(newPost)
      setPost({title: '', body: ''})
    }
  }

  return (
    <form>
        <input 
            type='text'
            placeholder='Название поста'
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
        />
        <input
            type='text' 
            placeholder='Описание поста'
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
        />
        <button onClick={addNewPost}>Создать пост</button>
    </form>
  )
}

export default PostAddForm;
