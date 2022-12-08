import React from "react";
import { useNavigate } from 'react-router-dom';

function PostItem(props) {

  const navigate = useNavigate();

  return (
    <div onDoubleClick={() => {navigate(`/posts/${props.post.id}`)}} className='post-list__item' title='Кликните дважды, чтобы перейти в комментарии'>
        <h3>{props.post.id}. {props.post.title}</h3>
        <div>{props.post.body}</div>
    </div>
  );
}

export default PostItem;
