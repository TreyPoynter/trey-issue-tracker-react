/*eslint-disable */
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddCommment({ fetchComments }) {
    const bugId = useParams().bugId;
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function addComment(evt) {
        evt.preventDefault();
        setIsLoading(true);
		axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`, {
			text:comment
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
            setComment('');
            document.getElementById('txtComment').value = '';
		}).catch(error => {
            console.log(error)
		}).finally(() => {
            setIsLoading(false);
            fetchComments();
        });
        
    }

    return (
        <div id='addComment' className='d-flex mt-auto align-items-center mb-4'>
            <div className="d-flex flex-row align-items-start w-75">
                <input onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment..." 
                className="form-control newComment mt-0" id="txtComment"></input>
            </div>
            <div className=" justify-content-end d-flex w-50">
                <button onClick={(e) => addComment(e)} disabled={!comment || isLoading} className="btn btn-primary btn-sm w-75" 
                type="button">{isLoading ? 'Posting...' : 'Post'} <i className="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    )
}