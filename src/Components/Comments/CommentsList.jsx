/*eslint-disable */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../../assets/css/comment.css'
import CommentItem from "./CommentItem";
import AddCommment from "./AddComment";

export default function CommentsList() {
    const scrollContainerRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const bugId = useParams().bugId;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
          //? Scroll to the bottom of the comments list
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };
    function fetchComments()  {
        console.log('FETCHING')
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/list`, { withCredentials: true })
            .then(
                res => {
                    setComments(res.data);
                    scrollToBottom();
                }
            ).catch(error => { console.log(error) })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchComments();
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
                    <AddCommment fetchComments={fetchComments}/>
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="body-div">
                <div className="comment form d-flex flex-column" id='comment-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/bugs/${bugId}`}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <div className=''>
                        <h2 className="mb-3 pb-2 display-5 text-center border-bottom pb-2">Comments</h2>
                    </div>
                    <div ref={scrollContainerRef} id={comments.length > 0 ? `commentList` : 'commentList-load'}>
                        {
                            comments.length < 1 ?
                                <div className="text-center">
                                    <i className="fa-solid fa-comment-slash fs-1"></i>
                                    <h4>This bug doesn't have any comments</h4>
                                </div> :
                                comments.map((comment, i) => {
                                    return (<CommentItem key={i} comment={comment} user={user}/>)
                                })
                        }

                    </div>
                    <AddCommment fetchComments={fetchComments}/>
                </div>
            </div>
        </>
    )
}