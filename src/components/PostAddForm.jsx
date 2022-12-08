import {useState} from "react";

function PostAddForm({create, postsCount}) {

  const [post, setPost] = useState({title: '', body: ''})
  const [count, setCount] = useState(1)

  function addNewPost(e) {
    e.preventDefault()
    if (post.title !== '' && post.body !== '') {
      setCount(count + 1)
      const newPost = {
        ...post, id: Number(postsCount) + count
      }
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
