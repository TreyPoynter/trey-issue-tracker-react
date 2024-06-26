/*eslint-disable */

export default function BugsPaging({ setPaging, allBugs, pageSize, pageNum }) {
    const totalPages = Math.ceil(allBugs.length / pageSize);
    return (
        <div>
            <button className="btn btn-primary"
                onClick={() => setPaging(pageNum - 1)}
                disabled={pageNum === 1}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span> {pageNum} </span>
            <button className="btn btn-primary"
                onClick={() => setPaging(pageNum + 1)}
                disabled={pageNum > totalPages || allBugs.length < pageSize}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}