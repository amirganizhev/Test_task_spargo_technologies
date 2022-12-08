import React from 'react';
import PostItem from './PostItem';

function PostList({posts, pagination, currentPage, onClick}) {

  return (
    <div className='post-list'>
        <h2>Список постов</h2>
        {posts.map((post) =>
            <PostItem post={post} key={post.id} />
        )}
        <div className='pagination'>
            {pagination.map(page => {
                return (
                    <span 
                        key={page} 
                        className={currentPage === page ? 'pagination__item pagination__item_color' : 'pagination__item'}
                        onClick={() => onClick(page)}
                    >
                        {page}
                    </span>
                )}
            )}
        </div>
    </div>
  );
}

export default PostList;