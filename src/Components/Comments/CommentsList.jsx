/*eslint-disable */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/css/comment.css'
import CommentItem from "./CommentItem";
import AddCommment from "./AddComment";

export default function CommentsList() {
    const user = JSON.parse(localStorage.getItem('user'));
    const bugId = useParams().bugId;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/list`, { withCredentials: true })
            .then(
                res => {
                    setComments(res.data)
                }
            ).catch(error => { console.log(error) })
            .finally(() => setIsLoading(false));
    }, []);
    if (isLoading) {
        return (
            <div id="body-div">
                <div className="form d-flex flex-column" id='bug-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/bugs/${bugId}`}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <div className=''>
                        <h2 className="mb-3 pb-2 display-5 text-center border-bottom pb-2">Comments</h2>
                    </div>
                    <div id='commentList-load'>
                        <div className="square-loading"></div>
                    </div>
                    <AddCommment comments={comments}/>
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="body-div">
                <div className="form d-flex flex-column" id='bug-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/bugs/${bugId}`}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <div className=''>
                        <h2 className="mb-3 pb-2 display-5 text-center border-bottom pb-2">Comments</h2>
                    </div>
                    <div id={comments.length > 0 ? `commentList` : 'commentList-load'}>
                        {
                            comments.length < 1 ? 
                            <div className="text-center">
                                <i className="fa-solid fa-comment-slash fs-1"></i>
                                <h4>This bug doesn't have any comments</h4>
                            </div> :
                            comments.map((comment, i) => {
                                return(<CommentItem key={i} comment={comment}/>)
                            })
                        }
                        
                    </div>
                    <AddCommment user={user}/>
                </div>
            </div>
        </>
    )
}