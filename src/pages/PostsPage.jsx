import { useEffect, useState } from 'react';
import PostAddForm from '../components/PostAddForm';
import SelectSort from '../components/SelectSort';
import InputSearchId from '../components/InputSearchId';
import PostService from '../API/PostService';
import PostList from '../components/PostList';

function PostsPage() {

  const [posts, setPosts] = useState([])
  const [searchId, setSearchId] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [limitPosts, setLimiPosts] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [countPosts, setCountPosts] = useState(0)
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
    setCountPosts(response.headers['x-total-count'])
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
      <PostAddForm postsCount={countPosts} create={createPost} />
      <SelectSort
          onChange={changePostsLimit}
          selectName="Выбрать количество отображаемых постов"
          options={[
              {optionValue: 10, optionName: '10'},
              {optionValue: 20, optionName: '20'},
              {optionValue: 50, optionName: '50'},
              {optionValue: 100, optionName: '100'}
          ]}
      />
      <SelectSort
          onChange={sortPosts}
          selectName="Сортировка по ID"
          options={[
              {optionValue: 'increase', optionName: 'Сортировка по возрастанию ID'},
              {optionValue: 'descending', optionName: 'Сортировка по убыванию ID'}
          ]}
      />
      <InputSearchId 
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
      />
      <PostList 
          posts={filterPosts}
          pagination={pagesArray}
          currentPage={pageNumber}
          onClick={changePageNumber}
      />
    </div>
  );
}

export default PostsPage;