import { useState } from "react"

export default function AddCommment({ user }) {

    const [comment, setComment] = useState('');

    return (
        <div id='addComment' className='d-flex mt-auto align-items-center mb-4'>
            <div className="d-flex flex-row align-items-start w-75">
                <input onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment..." className="form-control newComment mt-0"></input>
            </div>
            <div className=" justify-content-end d-flex w-50">
                <button disabled={!comment} className="btn btn-primary btn-sm w-75" 
                type="button">Post <i className="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    )
}