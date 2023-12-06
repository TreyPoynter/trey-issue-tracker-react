/* eslint-disable */
import { Link } from "react-router-dom";

export default function CommentItem({ comment, user }) {
    function formatDate(dateCreated) {
        const date = new Date(dateCreated);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sept", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return month + ' ' + day + ', ' + year;
    }
    return (
        <div className={`bg-white d-flex flex-column comment-section border border-bottom 
        ${user._id == comment.author_id && 'flex-row-reverse text-align-end'}`}>
            <div className="bg-white p-2">
                <div className={`d-flex flex-row user-info ${user._id == comment.author_id && 'flex-row-reverse text-end'}`}>
                    <div className={`user-icon-container ${user._id == comment.author_id ? 'ms-3' : 'me-3'}`}>
                        <i className="fas fa-user user-icon"></i>
                    </div>
                    <div className="d-flex flex-column justify-content-start ml-2">
                        <Link to={`/users/${comment.author_id}`} className="d-block font-weight-bold name text-decoration-none">
                            {comment.author}
                        </Link>
                        <span className="date text-black-50">Posted on - {formatDate(comment.date)}</span>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="comment-text">{comment.text}</p>
                </div>
            </div>
        </div>

    )
}