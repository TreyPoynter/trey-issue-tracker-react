/* eslint-disable */
import { Link } from "react-router-dom"

export default function Bug({ bug }) {
    return (
        <div className="col-lg-3 col-md-6 mb-3">
            <Link to={`/bug/${bug._id}`} className="justify-content-center mb-4 text-decoration-none">
                <div className="card p-1">
                    <div className="">
                        <span className={`badge bg-${bug.classification.classifiedAs == 'approved' ? 'success' :
                            bug.classification.classifiedAs == 'unapproved' || bug.classification.classifiedAs == 'duplicate'
                            ? 'danger' : 'warning'}`}>ur mom</span>
                        <h3 className="text-center fs-5">{bug.title}</h3>
                    </div>
                    <div className="card-body text-center">
                        <i className={`fas mb-2 fa-solid fa-5x ${bug.closedInfo.closed ? "fa-bug-slash" : "fa-bug"}`}></i>
                        <h5>Assigned to : {bug?.assignedInfo?.assignedToName ? bug.assignedInfo.assignedToName : 'No One'}</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}