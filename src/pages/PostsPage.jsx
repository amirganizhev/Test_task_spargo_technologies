import { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import PostAddForm from '../components/PostAddForm';
import PostService from '../API/PostService';

function PostsPage() {

  const [posts, setPosts] = useState([])
  const [searchId, setSearchId] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [limitPosts, setLimiPosts] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  let pagesArray = []
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1)
  }

  useEffect(() => {
    fetchPosts()
  }, [pageNumber, limitPosts])

  async function fetchPosts(limit) {
    const response = await PostService.getAll(limitPosts, pageNumber)
    setPosts(response.data)
    const totalPosts = response.headers['x-total-count']
    setTotalPages(Math.ceil(totalPosts / limitPosts))
  }

  function changePageNumber(p) {
    setPageNumber(p)
  }

  function createPost(newPost) {
    setPosts([newPost, ...posts])
  }

  function sortPosts(e) {
    if (e.target.value === 'increase') {
      posts.sort((a, b) => {
        return a.id - b.id
      })
      setPosts([...posts])
    }

    if (e.target.value === 'descending') {
      posts.sort((a, b) => {
        return b.id - a.id
      })
      setPosts([...posts])
    }
  }

  function changePostsLimit(e) {
    const value = e.target.value
    if (value === '10')
        setLimiPosts(10)
    if (value === '20')
        setLimiPosts(20)
    if (value === '50')
        setLimiPosts(50)
    if (value === '100')
        setLimiPosts(100)
  }

  const filterPosts = posts.filter(post => {
    return String(post.id).includes(searchId)
  })

  return (
    <div className='post-app'>
    <h1>Тестовое задание "Спарго технологии"</h1>
    <PostAddForm postsCount={posts.length + 1} create={createPost} />
    <div className='select'>
        <select defaultValue='selected' onChange={changePostsLimit}>
            <option disabled value='selected'>Выбрать количество отображаемых постов</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
        </select>
    </div>
    <div className='select'>
        <select defaultValue='selected' onChange={sortPosts}>
            <option disabled value='selected'>Сортировка по ID</option>
            <option value='increase'>Сортировка по возрастанию ID</option>
            <option value='descending'>Сортировка по убыванию ID</option>
        </select>
    </div>
    <input 
        type='text'
        placeholder='Поиск по ID'
        value={searchId}
        onChange={e => setSearchId(e.target.value)}
    />
    <div className='post-list'>
        <h2>Список постов</h2>
        {filterPosts.map((post) =>
            <PostItem post={post} key={post.id} />
        )}
        <div className='pagination'>
            {pagesArray.map(page => {
                return (
                    <span 
                        key={page} 
                        className={pageNumber === page ? 'pagination__item pagination__item_color' : 'pagination__item'}
                        onClick={() => changePageNumber(page)}
                    >
                        {page}
                    </span>
                )}
            )}
        </div>
    </div>
    </div>
  );
}

export default PostsPage;