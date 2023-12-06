/*eslint-disable */
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddCommment({ comments }) {
    const bugId = useParams().bugId;
    const [comment, setComment] = useState('');

    function addComment(evt) {
        evt.preventDefault();
		axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`, {
			text:comment
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
		}).catch(error => {
            console.log(error)
		});
    }

    return (
        <div id='addComment' className='d-flex mt-auto align-items-center mb-4'>
            <div className="d-flex flex-row align-items-start w-75">
                <input onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment..." className="form-control newComment mt-0"></input>
            </div>
            <div className=" justify-content-end d-flex w-50">
                <button onClick={(e) => addComment(e)} disabled={!comment} className="btn btn-primary btn-sm w-75" 
                type="button">Post <i className="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    )
}