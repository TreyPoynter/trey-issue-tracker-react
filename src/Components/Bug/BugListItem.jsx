/* eslint-disable */
import { Link, NavLink } from "react-router-dom"
import '../../assets/css/infoCard.css'

export default function BugListItem({ bug }) {
	const user = JSON.parse(localStorage.getItem('user'));
	function formatDate(dateCreated) {
		const date = new Date(dateCreated);

		const formattedDate = date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		return formattedDate;
	}
	return (
		<div className="col-lg-4 col-md-6 mb-3">
			<Link className="text-decoration-none" to={`/bugs/${bug._id}`}>
				<div className="info-card d-flex flex-column pt-2">
					<div className="d-flex justify-content-between mb-2">
						<i className={`badge bg-${bug.classification.classifiedAs == 'approved' ? 'success' :
							bug.classification.classifiedAs == 'unapproved' || bug.classification.classifiedAs == 'duplicate'
								? 'danger' : 'warning'}`}>{bug.classification.classifiedAs}
						</i>
						<i className={`badge bg-${!bug.closedInfo.closed ? 'success ' : 'danger'}`}>
							{!bug.closedInfo.closed ? 'open' : 'closed'}
						</i>
					</div>
					<div className="info-card-image d-flex justify-content-center align-items-center">
						<i class="fa-solid fa-spider"></i>
					</div>
					<p className="info-card-title">{bug.title}</p>
					<div className="flex-grow-1"></div> {/* This div will push the info-footers to the bottom */}
					<div className="d-flex flex-column justify-content-end align-items-end">
						<p className="info-footer"><i class="fa-solid fa-user-tag"></i> Assigned to <span className="by-name">
							John Doe</span>
						</p>
						<p className="info-footer"><i class="fa-regular fa-clock"></i> Created by <span className="by-name">
							{bug.createdBy.name}</span> on <span className="by-name">{formatDate(bug.dateCreated)}</span>
						</p>
					</div>
				</div>
			</Link>
		</div>

	)
}