/* eslint-disable */

export default function CommentItem({ comment }) {
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
        <div className="d-flex flex-column comment-section border border-bottom">
            <div className="bg-white p-2">
                <div className="d-flex flex-row user-info">
                    <div className="user-icon-container me-2">
                        <i className="fas fa-user user-icon"></i>
                    </div>
                    <div className="d-flex flex-column justify-content-start ml-2">
                        <span className="d-block font-weight-bold name">{comment.author}</span>
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