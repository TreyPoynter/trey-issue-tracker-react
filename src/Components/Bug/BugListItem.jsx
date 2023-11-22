/* eslint-disable */
import { Link, NavLink } from "react-router-dom"

export default function Bug({ bug }) {
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<div className="col-lg-3 col-md-6 mb-3">
			<div className="justify-content-center mb-4 text-decoration-none card p-1">
				<Link to={`/bug/${bug._id}`} className="text-black text-decoration-none">
					<div className="text-decoration-none">
						<span className={`badge bg-${bug.classification.classifiedAs == 'approved' ? 'success' :
							bug.classification.classifiedAs == 'unapproved' || bug.classification.classifiedAs == 'duplicate'
								? 'danger' : 'warning'}`}>{bug.classification.classifiedAs}</span>
						<h3 className="text-center fs-5">{bug.title}</h3>
					</div>
					<div className="card-body text-center">
						<i className={`fas mb-2 fa-solid fa-5x ${bug.closedInfo.closed ? "fa-bug-slash" : "fa-bug"}`}></i>
						<h5>Assigned to : {bug?.assignedInfo?.assignedToName ? bug.assignedInfo.assignedToName : 'No One'}</h5>
					</div>
				</Link>
				<div className="card-footer d-flex justify-content-around">
					{user &&
						user.role.includes('business analyst') ||
						bug.createdBy.user_id == user._id &&
						<Link to={`/bugs/${bug._id}/edit`} className="btn btn-warning">Edit Bug</Link>
					}
				</div>
			</div>
		</div>
	)
}