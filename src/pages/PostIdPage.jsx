import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';

function PostIdPage() {

    const params = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchPostComments()
    }, [])

    async function fetchPostComments() {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    }

    return (
        <div className="post-id">
            <h1>Пост с ID = {params.id}</h1>
            <h2>Комментарии к посту ниже:</h2>
            <div>
                {comments.map(comment => {
                    return (<div key={comment.id} className="post-id__comment">
                                <div><strong>ID:</strong> {comment.id}</div>
                                <div><strong>Name:</strong> {comment.name}</div>
                                <div><strong>Email:</strong> {comment.email}</div>
                                <div><strong>Body:</strong> {comment.body}</div>
                            </div>)
                })}
            </div>
        </div>
    );
}

export default PostIdPage;
